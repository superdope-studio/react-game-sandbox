import { GameCard } from "../data/cards";

export const shuffleDeck = (deck: GameCard[]): GameCard[] => {
  let shuffledDeck = [...deck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
};

export const drawCards = (
  deck: GameCard[],
  numberOfCards: number
): { remainingDeck: GameCard[]; drawnCards: GameCard[] } => {
  return {
    remainingDeck: deck.slice(numberOfCards),
    drawnCards: deck.slice(0, numberOfCards),
  };
};
