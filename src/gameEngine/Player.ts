import { GameCard } from "../data/cards";

export class Player {
  health: number;
  energy: number;
  hand: GameCard[];
  deck: GameCard[];
  discardPile: GameCard[];
  turnCount: number;
  type: "Human" | "AI";

  constructor(
    health: number,
    energy: number,
    deck: GameCard[],
    type: "Human" | "AI"
  ) {
    this.health = health;
    this.energy = energy;
    this.hand = [];
    this.deck = [...deck];
    this.discardPile = [];
    this.turnCount = 0;
    this.type = type;
  }

  incrementTurnCount() {
    this.turnCount += 1;
  }

  getTurnCount() {
    return this.turnCount;
  }

  addEnergy(quantity: number) {
    this.energy = this.energy + quantity;
  }

  takeDamage(damage: number): void {
    this.health = this.health - damage;
  }

  spendEnergy(energy: number): void {
    this.energy = this.energy - energy;
  }

  getDeck(): GameCard[] {
    return this.deck;
  }

  getHand(): GameCard[] {
    return this.hand;
  }

  shuffleDeck(): void {
    let shuffledDeck = [...this.deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    this.deck = shuffledDeck;
  }

  drawCards(quantity: number): void {
    this.hand = this.hand.concat(this.deck.slice(0, quantity));
    this.deck = this.deck.slice(quantity);
  }

  removeCardFromHand(card: GameCard) {
    this.hand = this.hand.filter(
      (cardInHand) => cardInHand.title !== card.title
    );
  }
}
