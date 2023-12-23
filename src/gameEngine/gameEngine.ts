import { GameCard, enemyDeck, playerDeck } from "../data/cards";
import { AI } from "./AIPlayer";
import { Player } from "./Player";

/**
 * In general, components that want to interact with the
 * GameEngine should call methods of the GameEngine class
 * the game engine is the delegate responsible for
 * orchestrating child components (players, cards, etc)
 *
 * The GameEnging is also responsible for calling the
 * React context listeners when state is updates
 * which causes UI updates
 */
export type GameState = {
  humanState: Player;
  aiState: AI;
  globalState: {
    battleground: GameCard[];
    activePlayer: Player;
    turnPhase: "Start" | "Main" | "End";
  };
};

export class GameEngine {
  human: Player;
  ai: AI;
  battleground: GameCard[];
  turnPhase: "Start" | "Main" | "End";
  activePlayer: Player;
  listeners?: [(state: GameEngine) => void];

  constructor() {
    this.human = new Player(10, 0, playerDeck, "Human");
    this.ai = new AI(10, 0, enemyDeck, "AI");
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
    this.ai = new AI(10, 0, enemyDeck, "AI");
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
        this.activePlayer.drawCards(1);
        this.activePlayer.incrementTurnCount();
        this.activePlayer.setEnergy(this.activePlayer.getTurnCount());
        this.turnPhase = "Main";

        if (this.activePlayer.type === "AI") {
          this.ai.takeTurn((card: GameCard) => {
            this.resolveCardPlay(card, this.ai, this.human);
          });
          this.advanceTurnPhase();
        }
        break;
      case "Main":
        this.turnPhase = "End";
        this.advanceTurnPhase();
        break;
      case "End":
        this.passTurn();
        this.checkForGameOver();
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

  resolveCardPlay(card: GameCard, source: Player, target: Player) {
    source.spendEnergy(card.energyCost);
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

  checkForGameOver() {
    if (this.ai.health <= 0) {
      alert("you win!");
      this.startGame();
    } else if (this.human.health <= 0) {
      alert("you lose!");
      this.startGame();
    }
  }
}
