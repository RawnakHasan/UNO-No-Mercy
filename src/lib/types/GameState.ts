import type { Card } from "./Cards.type";

export type Profile = {
  id: string;
  username: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Player = {
  id: string; // Player row ID
  user_id: string; // Auth user ID
  profile_id: string; // ⭐ Links to profiles table
  room_id: string;
  player_index: number;
  hand: Card[];
  card_count: number;
  is_spectator: boolean;
  is_connected: boolean;
  said_uno: boolean;
};

export type InitialGameState = {
  room: string;
  players: Player[];
  currentIndex: number;
  currentCard: Card;
  currentDrawCount: number;
  discardDeck: Card[];
  drawDeck: Card[];
  rotation: 1 | -1;
  gameState: "waiting" | "playing" | "finished";
};
