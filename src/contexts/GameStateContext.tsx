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
  playerHand: GameCard[];
  playerDeck: GameCard[];
  battleground: GameCard[]; //for now just an array of the cards that have been played in order
};

interface GameStateContextType {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  playCard: (cardIndex: number) => void;
}

const initialState: GameState = {
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
    const newPlayerHand = [...gameState.playerHand];
    const card = newPlayerHand.splice(cardIndex, 1);
    const newBattleground = gameState.battleground.concat(card);
    setGameState((prevState: any) => ({
      ...prevState,
      playerHand: newPlayerHand,
      battleground: newBattleground,
    }));
  };

  const value = { gameState, setGameState, playCard };

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
