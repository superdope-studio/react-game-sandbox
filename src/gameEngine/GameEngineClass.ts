import { listeners } from "process";
import { GameCard, enemyDeck, playerDeck } from "../data/cards";
import { Card } from "./Card";
import { Player } from "./Player";

export class GameEngine {
    human: Player;
    ai: Player;
    battleground: GameCard[];
    currentTurn: "Human" | "AI";
    turnPhase: "Start" | "Main" | "End";
    listeners?: [(state: GameEngine) => void];

    constructor() {
        this.human = new Player(10, 0, playerDeck, "Human");
        this.ai = new Player(10, 0, enemyDeck, "AI");
        this.battleground = [];
        this.currentTurn = "Human";
        this.turnPhase = "Start";
    }

    updateListeners() {
        this.listeners?.forEach((listener) => {
            listener(this);
        })
    }

    registerListener(listener: () => void) {
        if (this.listeners) {
            this.listeners.push(listener)
        } else {
            this.listeners = [listener]
        }
    }

    startGame() {
        this.human.shuffleDeck();
        this.human.drawCards(3);
        this.ai.shuffleDeck();
        this.ai.drawCards(3);
        this.updateListeners();
    }

    advanceTurnPhase() {
        switch (this.turnPhase) {
            case "Start":
                this.turnPhase = "Main";
                break;
            case "Main":
                this.turnPhase = "End";
                break;
            case "End":
                this.passTurn()
                break;
            default:
                break;
        }
        this.updateListeners();
    }

    passTurn() {
        switch (this.currentTurn) {
            case "Human":
                this.currentTurn = "AI";
                this.turnPhase = "Start";
                break;
            case "AI":
                this.currentTurn = "Human";
                this.turnPhase = "Start";
                break;
            default:
                break;

        }
        this.updateListeners();
    }

    getState() {
        return {
            humanState: this.human,
            aiState: this.ai,
            globalState: {
                battleground: this.battleground,
                currentTurn: this.currentTurn,
                turnPhase: this.turnPhase
            }
        }
    }

    getActivePlayer() {
        if (this.currentTurn === "Human") {
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

}