import type { Card } from "./Cards.type";

export type Player = {
  id: string;
  username: string;
  room: string;
  index: number;
  hand: Card[];
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
