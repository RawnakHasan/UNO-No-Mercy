import {
  type Card,
  type CardColor,
  type NormalCardNumber,
  type PowerCardPower,
  type WildCardWild,
} from "../types/Cards.type";

export const CardColors: CardColor[] = ["Red", "Blue", "Green", "Yellow"];

const normalNumbers: NormalCardNumber[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const formatName = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // split "reverseDraw4" → "reverse Draw4"
    .replace(/(\D)(\d+)/g, "$1 $2") // split numbers: "Draw4" → "Draw 4"
    .replace(/^./, (c) => c.toUpperCase());

const getImage = (
  type: Card["type"],
  color: CardColor | null,
  name: string
) => {
  if (type === "wild") return `/Cards/Wild ${formatName(name)}.svg`;
  return `/Cards/${color} ${formatName(name)}.svg`;
};

export const createFullDeck = (): Card[] => {
  const Deck: Card[] = [];

  // Normal cards: 0–9, 2x each
  CardColors.forEach((color) => {
    normalNumbers.forEach((value) => {
      const display = `${color} ${value}`;
      const frontFaceImage = getImage("normal", color, String(value));

      Deck.push({
        type: "normal",
        color,
        value,
        frontFaceImage,
        backFaceImage: "/Cards/Back.svg",
        displayName: display,
      });
      Deck.push({
        type: "normal",
        color,
        value,
        frontFaceImage,
        backFaceImage: "/Cards/Back.svg",
        displayName: display,
      });
    });
  });

  // Power card helper
  const addPower = (color: CardColor, power: PowerCardPower, count: number) => {
    const display = `${color} ${formatName(power)}`;
    const frontFaceImage = getImage("power", color, power);

    for (let i = 0; i < count; i++) {
      Deck.push({
        type: "power",
        color,
        power,
        frontFaceImage,
        backFaceImage: "/Cards/Back.svg",
        displayName: display,
      });
    }
  };

  // Power Cards
  CardColors.forEach((color) => {
    addPower(color, "reverse", 3);
    addPower(color, "skip", 3);
    addPower(color, "skipAll", 2);
    addPower(color, "discardAll", 3);
    addPower(color, "draw2", 2);
    addPower(color, "draw4", 2);
  });

  // Wild card helper
  const addWild = (wild: WildCardWild, count: number) => {
    const display = formatName(wild);
    const frontFaceImage = getImage("wild", null, wild);

    for (let i = 0; i < count; i++) {
      Deck.push({
        type: "wild",
        wild,
        frontFaceImage,
        backFaceImage: "/Cards/Back.svg",
        displayName: display,
      });
    }
  };

  // Wild Cards
  addWild("reverseDraw4", 8);
  addWild("colorRoulette", 8);
  addWild("draw6", 4);
  addWild("draw10", 4);

  return Deck;
};

export const shuffleDeck = (cards: Card[]): Card[] => {
  const shuffledDeck = [...cards];

  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }

  return shuffledDeck;
};
