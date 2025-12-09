import type { User } from "@supabase/supabase-js";
import { createContext } from "react";

type AuthContextType = {
  user: User | null;
  username: string | null;
  avatarUrl: string | null; // ⭐ Add this
  loading: boolean;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
