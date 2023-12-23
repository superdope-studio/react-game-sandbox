import { GameCard, enemyDeck, playerDeck } from "../data/cards";
import { Player } from "./Player";

export type GameState = {
  humanState: Player;
  aiState: Player;
  globalState: {
    battleground: GameCard[];
    activePlayer: Player;
    turnPhase: "Start" | "Main" | "End";
  };
};

export class GameEngine {
  human: Player;
  ai: Player;
  battleground: GameCard[];
  turnPhase: "Start" | "Main" | "End";
  activePlayer: Player;
  listeners?: [(state: GameEngine) => void];

  constructor() {
    this.human = new Player(10, 0, playerDeck, "Human");
    this.ai = new Player(10, 0, enemyDeck, "AI");
    this.battleground = [];
    this.turnPhase = "Start";
    this.activePlayer = this.human;
  }

  updateListeners() {
    this.listeners?.forEach((listener) => {
      listener({ ...this });
    });
  }

  registerListener(listener: (state: any) => void) {
    if (this.listeners) {
      this.listeners.push(listener);
    } else {
      this.listeners = [listener];
    }
  }

  startGame() {
    this.human = new Player(10, 0, playerDeck, "Human");
    this.ai = new Player(10, 0, enemyDeck, "AI");
    this.battleground = [];
    this.turnPhase = "Start";
    this.activePlayer = this.human;
    this.human.shuffleDeck();
    this.human.drawCards(3);
    this.ai.shuffleDeck();
    this.ai.drawCards(3);
    this.advanceTurnPhase();
    this.updateListeners();
  }

  advanceTurnPhase() {
    switch (this.turnPhase) {
      case "Start":
        this.activePlayer.incrementTurnCount();
        this.activePlayer.addEnergy(this.activePlayer.getTurnCount());
        this.turnPhase = "Main";
        break;
      case "Main":
        this.turnPhase = "End";
        this.advanceTurnPhase();
        break;
      case "End":
        this.passTurn();
        break;
      default:
        break;
    }
    this.updateListeners();
  }

  passTurn() {
    switch (this.activePlayer.type) {
      case "Human":
        this.turnPhase = "Start";
        this.activePlayer = this.ai;
        this.advanceTurnPhase();
        break;
      case "AI":
        this.turnPhase = "Start";
        this.activePlayer = this.human;
        this.advanceTurnPhase();
        break;
      default:
        break;
    }
    this.updateListeners();
  }

  getState(): GameState {
    return {
      humanState: this.human,
      aiState: this.ai,
      globalState: {
        battleground: this.battleground,
        activePlayer: this.activePlayer,
        turnPhase: this.turnPhase,
      },
    };
  }

  getActivePlayer() {
    if (this.activePlayer.type === "Human") {
      return this.human;
    } else {
      return this.ai;
    }
  }

  getHuman() {
    return this.human;
  }

  getAi() {
    return this.ai;
  }

  takeAiTurn() {}

  resolveCardPlay(card: GameCard, source: Player, target: Player) {
    source.addEnergy(-card.energyCost);
    target.takeDamage(card.damage);
    source.removeCardFromHand(card);
    this.battleground.push(card);
    this.updateListeners();
  }

  validateCardPlay(card: GameCard) {
    if (this.activePlayer.type === "AI") {
      return false;
    }

    if (this.human.energy < card.energyCost) {
      return false;
    }

    return true;
  }
}
