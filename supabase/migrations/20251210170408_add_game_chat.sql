-- ==========================================
-- CLEANUP AND FIX SCHEMA MIGRATION
-- Run this in Supabase SQL Editor
-- ==========================================

-- Step 1: Check what columns exist in players table
-- (Run this first to see current state)
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'players';

-- Step 2: Migrate data from username to profile_id if needed
-- Create profile_id if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'players' AND column_name = 'profile_id'
  ) THEN
    ALTER TABLE players ADD COLUMN profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE;
    CREATE INDEX IF NOT EXISTS idx_players_profile_id ON players(profile_id);
  END IF;
END $$;

-- Step 3: If username still exists and profile_id is null, try to link them
-- (This assumes usernames in players match usernames in profiles)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'players' AND column_name = 'username'
  ) THEN
    UPDATE players p
    SET profile_id = pr.id
    FROM profiles pr
    WHERE p.username = pr.username
    AND p.profile_id IS NULL;
  END IF;
END $$;

-- Step 4: Remove user_id if it exists (we only need profile_id)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'players' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE players DROP COLUMN user_id;
  END IF;
END $$;

-- Step 5: Remove username column after migration (BE CAREFUL!)
-- Uncomment only after verifying profile_id is populated
-- DO $$
-- BEGIN
--   IF EXISTS (
--     SELECT 1 FROM information_schema.columns 
--     WHERE table_name = 'players' AND column_name = 'username'
--   ) THEN
--     ALTER TABLE players DROP COLUMN username;
--   END IF;
-- END $$;

-- Step 6: Ensure game_rooms.created_by references auth.users properly
DO $$
BEGIN
  -- Check if created_by is already UUID type
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'game_rooms' 
    AND column_name = 'created_by' 
    AND data_type = 'uuid'
  ) THEN
    -- Drop existing constraint if any
    ALTER TABLE game_rooms DROP CONSTRAINT IF EXISTS fk_created_by;
    
    -- Convert to UUID (this assumes existing data can be cast to UUID)
    ALTER TABLE game_rooms ALTER COLUMN created_by TYPE UUID USING created_by::uuid;
    
    -- Add foreign key
    ALTER TABLE game_rooms ADD CONSTRAINT fk_created_by 
      FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Step 7: Create all necessary indexes (idempotent)
CREATE INDEX IF NOT EXISTS idx_players_profile_id ON players(profile_id);
CREATE INDEX IF NOT EXISTS idx_players_room_id ON players(room_id);
CREATE INDEX IF NOT EXISTS idx_game_rooms_created_by ON game_rooms(created_by);
CREATE INDEX IF NOT EXISTS idx_spectator_requests_room_id ON spectator_requests(room_id);

-- Step 8: Verify the schema
SELECT 
  'players' as table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'players'
ORDER BY ordinal_position;

-- Check for any players without profile_id
SELECT 
  COUNT(*) as players_without_profile,
  COUNT(*) FILTER (WHERE profile_id IS NOT NULL) as players_with_profile
FROM players;
