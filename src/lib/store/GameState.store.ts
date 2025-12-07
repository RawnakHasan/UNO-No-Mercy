import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Card } from "../types/Cards.type";
import type { Player, InitialGameState } from "../types/GameState";

type GameStore = InitialGameState & {
  addPlayer: (player: Player) => void;
  removePlayer: (id: string) => void;
  startGame: (deck: Card[]) => void;
  drawCards: (playerId: string, count: number) => void;
  playCard: (playerId: string, card: Card) => void;
  nextTurn: () => void;
  resetGame: () => void;
};

export const useGameStore = create<GameStore>()(
  immer((set) => ({
    room: "",
    players: [],
    currentIndex: 0,
    currentCard: null as unknown as Card,
    currentDrawCount: 0,
    discardDeck: [],
    drawDeck: [],
    rotation: 1,
    gameState: "waiting",

    addPlayer: (player) =>
      set((state) => {
        state.players.push(player);
      }),

    removePlayer: (id) =>
      set((state) => {
        state.players = state.players.filter((p: Player) => p.id !== id);
      }),

    startGame: (deck) =>
      set((state) => {
        state.gameState = "playing";
        state.drawDeck = deck;
        state.discardDeck = [];
        state.currentIndex = 0;
        state.currentCard = deck.pop() as Card;
      }),

    drawCards: (playerId, count) =>
      set((state) => {
        const player = state.players.find((p: Player) => p.id === playerId);
        if (!player) return;

        const drawn = state.drawDeck.splice(-count, count);
        player.hand.push(...drawn);
      }),

    playCard: (playerId, card) =>
      set((state) => {
        const player = state.players.find((p: Player) => p.id === playerId);
        if (!player) return;

        player.hand = player.hand.filter((c: Card) => c !== card);

        state.discardDeck.push(state.currentCard);
        state.currentCard = card;
      }),

    nextTurn: () =>
      set((state) => {
        const total = state.players.length;
        state.currentIndex =
          (state.currentIndex + state.rotation + total) % total;
      }),

    resetGame: () =>
      set((state) => {
        state.gameState = "waiting";
        state.drawDeck = [];
        state.discardDeck = [];
        state.currentDrawCount = 0;
        state.currentIndex = 0;
      }),
  }))
);
