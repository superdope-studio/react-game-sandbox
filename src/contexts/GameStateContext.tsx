import React, { useContext, useState } from "react";

import {
  GameCard,
  enemyDeck as initialEnemyDeck,
  playerDeck as initialPlayerDeck,
} from "../data/cards";

/**
 * state management for most all game state should live here (for now)
 * export helpers for components to call to mutate state
 * those helpers should just call setState within the context
 * not render efficient, but simple
 *
 */

type GameState = {
  playerHealth: number;
  playerEnergy: number;
  enemyHealth: number;
  enemyEnergy: number;
  playerTurn: boolean;
  playerHand: GameCard[];
  playerDeck: GameCard[];
  enemyHand: GameCard[];
  enemyDeck: GameCard[];
  battleground: GameCard[]; //for now just an array of the cards that have been played in order
};

interface GameStateContextType {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  playCard: (cardIndex: number) => void;
  startGame: () => void;
  cardCanBePlayed: (card: GameCard) => boolean;
  endTurn: () => void;
  processEnemyTurn: () => void;
}

const initialState: GameState = {
  playerHealth: 10,
  playerEnergy: 10,
  enemyHealth: 10,
  enemyEnergy: 10,
  playerTurn: true,
  playerHand: [],
  playerDeck: initialPlayerDeck,
  enemyDeck: initialEnemyDeck,
  enemyHand: [],
  battleground: [],
};

const GameStateContext = React.createContext<GameStateContextType | undefined>(
  undefined
);

export const GameStateProvider = ({ children }: { children: any }) => {
  const [gameState, setGameState] = useState<GameState>(initialState);

  /** lil baby state helpers go here, no need for redux */

  const endTurn = () => {
    setGameState((prevState: GameState) => ({
      ...prevState,
      playerTurn: false,
    }));
  };

  /**
   *
   * Determine if the card is a valid move given the
   * current game state
   * TODO - expand logic
   */
  const cardCanBePlayed = (card: GameCard) => {
    if (!gameState.playerTurn) {
      return false;
    }

    if (gameState.playerEnergy < card.energyCost) {
      return false;
    }

    return true;
  };

  /**
   * update game state based on card effects (energy cost, damage, etc)
   */
  const playCard = (cardIndex: number) => {
    let newPlayerDeck = [...gameState.playerDeck];
    let newPlayerHand = [...gameState.playerHand];
    const [card] = newPlayerHand.splice(cardIndex, 1);
    const newBattleground = gameState.battleground.concat([card]);

    // process card effects, very simple logic for now
    const newEnemyHealth = gameState.enemyHealth - card.damage;
    const newPlayerEnergy = gameState.playerEnergy - card.energyCost;

    // draw new card
    const randomIndex = Math.floor(Math.random() * newPlayerDeck.length);
    const randomCard = newPlayerDeck[randomIndex];

    // remove drawn card from deck
    newPlayerDeck.splice(randomIndex, 1);
    newPlayerHand.push(randomCard);

    // check for win?!
    if (newEnemyHealth <= 0) {
      alert("you win!");
    }

    setGameState((prevState: GameState) => ({
      ...prevState,
      playerDeck: newPlayerDeck,
      playerHand: newPlayerHand,
      battleground: newBattleground,
      enemyHealth: newEnemyHealth,
      playerEnergy: newPlayerEnergy,
    }));
  };

  /**
   * Start a new game, pick a single card from player deck and
   * put it in the player hand
   */
  const startGame = () => {
    const startingCards = 3;
    const newPlayerHand: GameCard[] = [];
    const newEnemyHand: GameCard[] = [];
    // build player hand
    const playerDeck = [...initialPlayerDeck];

    // pull startCards number of cards from deck
    for (let index = 0; index < startingCards; index++) {
      const playerRandomIndex = Math.floor(Math.random() * playerDeck.length);
      const playerRandomCard = playerDeck[playerRandomIndex];
      playerDeck.splice(playerRandomIndex, 1);
      newPlayerHand.push(playerRandomCard);
    }

    // build enemy hand
    const enemyDeck = [...initialEnemyDeck];

    for (let index = 0; index < startingCards; index++) {
      const enemyRandomIndex = Math.floor(Math.random() * enemyDeck.length);
      const enemyRandomCard = enemyDeck[enemyRandomIndex];
      enemyDeck.splice(enemyRandomIndex, 1);
      newEnemyHand.push(enemyRandomCard);
    }

    setGameState(() => ({
      ...initialState,
      playerDeck,
      playerHand: newPlayerHand,
      enemyHand: newEnemyHand,
    }));
  };

  /**
   * figure out enemy AI here, resolve their cards
   */

  const processEnemyTurn = () => {};

  const value = {
    gameState,
    setGameState,
    playCard,
    startGame,
    cardCanBePlayed,
    endTurn,
    processEnemyTurn,
  };

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error("useGameState must be used within a GameStateProvider");
  }
  return context;
};
