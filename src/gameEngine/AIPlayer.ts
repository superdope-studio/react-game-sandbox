import { GameCard } from "../data/cards";
import { Player } from "./Player";

/**
 * extents Player, just a place to implenent
 * enemy specific AI logic without polluting the Player class
 */
export class AI extends Player {
  getRandomValidCard(): GameCard {
    const validCardsInHand = this.hand.filter(
      (card) => card.energyCost <= this.energy
    );
    const randomIndex = Math.floor(Math.random() * validCardsInHand.length);
    const playedCard = validCardsInHand[randomIndex];

    return playedCard;
  }

  takeTurn(cardResolver: (card: GameCard) => void) {
    const cardToPlay = this.getRandomValidCard();

    if (cardToPlay) {
      cardResolver(cardToPlay);
    }
  }
}
