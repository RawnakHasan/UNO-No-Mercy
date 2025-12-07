export type CardColor = "Red" | "Blue" | "Green" | "Yellow";
export type NormalCardNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type PowerCardPower =
  | "reverse"
  | "skip"
  | "draw2"
  | "draw4"
  | "skipAll"
  | "discardAll";
export type WildCardWild =
  | "reverseDraw4"
  | "draw6"
  | "draw10"
  | "colorRoulette";

export type NormalCard = {
  type: "normal";
  displayName: string;
  frontFaceImage: string;
  backFaceImage: "/Cards/Back.svg";
  color: CardColor;
  value: NormalCardNumber;
};

export type PowerCard = {
  type: "power";
  displayName: string;
  frontFaceImage: string;
  backFaceImage: "/Cards/Back.svg";
  color: CardColor;
  power: PowerCardPower;
};

export type WildCard = {
  type: "wild";
  displayName: string;
  frontFaceImage: string;
  backFaceImage: "/Cards/Back.svg";
  transformedColor?: CardColor;
  wild: WildCardWild;
};

export type Card = NormalCard | PowerCard | WildCard;

export const isPowerCard = (card: Card): card is PowerCard =>
  card.type === "power";

export const isWildCard = (card: Card): card is WildCard =>
  card.type === "wild";
