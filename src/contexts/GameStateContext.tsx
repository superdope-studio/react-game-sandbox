import React, { useContext, useState } from "react";

import { GameCard, playerDeck } from "../data/cards";

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
  playerHand: GameCard[];
  playerDeck: GameCard[];
  battleground: GameCard[]; //for now just an array of the cards that have been played in order
};

interface GameStateContextType {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  playCard: (cardIndex: number) => void;
  startGame: () => void;
}

const initialState: GameState = {
  playerHealth: 10,
  playerEnergy: 10,
  enemyHealth: 10,
  enemyEnergy: 10,
  playerHand: [...playerDeck], // make a copy of the deck to use as initial hand for now
  playerDeck: playerDeck,
  battleground: [],
};

const GameStateContext = React.createContext<GameStateContextType | undefined>(
  undefined
);

export const GameStateProvider = ({ children }: { children: any }) => {
  const [gameState, setGameState] = useState<GameState>(initialState);

  /** lil baby state helpers go here, no need for redux */

  /**
   * TODO
   * perform checks to see if the card can be played
   * update game state based on card effects (energy cost, damage, etc)
   */
  const playCard = (cardIndex: number) => {
    let newPlayerHand = [...gameState.playerHand];
    const [card] = newPlayerHand.splice(cardIndex, 1);
    const newBattleground = gameState.battleground.concat([card]);

    // process card effects, very simply logic for now
    const newEnemyHealth = gameState.enemyHealth - card.damage;
    const newPlayerEnergy = gameState.playerEnergy - card.energyCost;

    // draw new card
    const randomIndex = Math.floor(Math.random() * gameState.playerDeck.length);
    const randomCard = gameState.playerDeck[randomIndex];
    newPlayerHand = [randomCard];

    // check for win?!
    if (newEnemyHealth <= 0) {
      alert("you win!");
    }

    setGameState((prevState: GameState) => ({
      ...prevState,
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
    const randomIndex = Math.floor(Math.random() * gameState.playerDeck.length);
    const randomCard = gameState.playerDeck[randomIndex];
    const newPlayerHand = [randomCard];
    setGameState((prevState: GameState) => ({
      ...initialState,
      playerHand: newPlayerHand,
    }));
  };

  const value = { gameState, setGameState, playCard, startGame };

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
