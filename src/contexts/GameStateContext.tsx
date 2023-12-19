import React, { useContext, useState } from "react";
import { GameCard, playerDeck } from "../data/cards";

type GameState = {
  playerHand: GameCard[];
  playerDeck: GameCard[];
  battleground: GameCard[]; //for now just an array of the cards that have been played in order
};

const initialState: {
  gameState: GameState;
  setGameState: any;
} = {
  gameState: {
    playerHand: [...playerDeck], // make a copy of the deck to use as initial hand for now
    playerDeck: playerDeck,
    battleground: [],
  },
  setGameState: (gameState: any) => {},
};

const GameStateContext = React.createContext(initialState);

export const GameStateProvider = ({ children }: { children: any }) => {
  const [gameState, setGameState] = useState(initialState.gameState);

  const value = { gameState, setGameState };

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
