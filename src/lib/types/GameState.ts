import type { Card } from "./Cards.type";

export type Player = {
  id: string; // This is the player row ID
  user_id: string; // ⭐ ADD THIS - links to auth.users
  username: string; // Display name
  room_id: string; // Add this too for foreign key
  player_index: number; // Turn order
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
