import { GameCard } from "../data/cards";

export type Effect = {
  type: "Shield" | "Other";
  effectValue: number;
  turnsRemaining: number;
};

export class Player {
  health: number;
  energy: number;
  hand: GameCard[];
  deck: GameCard[];
  discardPile: GameCard[];
  turnCount: number;
  type: "Human" | "AI";
  effects?: Effect[];

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

    // create the player with a 3 damage shield, just to demonstrate
    // how effects can be handled by the engine
    if (this.type === "Human") {
      this.effects = [{ type: "Shield", effectValue: 3, turnsRemaining: 2 }];
    }
  }

  incrementTurnCount() {
    this.turnCount++;
  }

  getTurnCount() {
    return this.turnCount;
  }

  setEnergy(quantity: number) {
    this.energy = quantity;
  }

  //the takeDamage method is responsible for checking active effects
  // that might impact damage taken
  // nothing else in the game needs awareness of these types of effects
  // other effects should be implemented in similar ways, for example
  // an effect that lets the player draw an additional card
  // can be checked in the drawCards method
  takeDamage(damage: number): void {
    const activeShield = this.effects?.filter(
      (effect) => effect?.type === "Shield"
    )[0];

    if (activeShield) {
      let modifiedDamage = 0;
      if (activeShield.effectValue >= damage) {
        modifiedDamage = 0;
        // we should now update the effect to remove the damage and update
        // the effect value with the remaining damage that will be blocked until the end of the effect
      } else if (activeShield.effectValue < damage) {
        modifiedDamage = damage - activeShield.effectValue;
      }

      this.health = this.health - modifiedDamage;
      return;
    }
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

  getActiveEffects() {
    return this.effects;
  }

  incrementTimedEffects() {
    this.effects = this.effects?.filter(
      (effect) => effect?.turnsRemaining >= 0
    );
    this.effects?.forEach((effect) => effect.turnsRemaining--);
  }

  getState() {
    return { ...this };
  }
}
