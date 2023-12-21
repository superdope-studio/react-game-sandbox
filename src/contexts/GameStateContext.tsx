import React, { createContext, useContext, useState, ReactNode } from "react";
import * as GameEngine from "../gameEngine/gameEngine";
import { GameState } from "../gameEngine/gameEngine";

/**
 * this context is responsible for syncronizing the game state from the gameEngine
 * and the UI state that is passed down to components to drive the UI
 * this allows us to decouple the game state and the ui state
 */

interface GameStateContextType {
  gameState: GameState;
  playCard: (cardIndex: number) => void;
  startGame: () => void;
  endTurn: () => void;
  processEnemyTurn: () => void;
}

const GameStateContext = createContext<GameStateContextType | undefined>(
  undefined
);

interface GameStateProviderProps {
  children: ReactNode;
}

export const GameStateProvider: React.FC<GameStateProviderProps> = ({
  children,
}) => {
  const [gameState, setGameState] = useState<GameState>(GameEngine.getState());

  const playCard = (cardIndex: number): void => {
    GameEngine.playCard(cardIndex);
    setGameState(GameEngine.getState());
  };

  const startGame = (): void => {
    GameEngine.startGame();
    setGameState(GameEngine.getState());
  };

  const endTurn = (): void => {
    GameEngine.endTurn();
    setGameState(GameEngine.getState());
  };

  const processEnemyTurn = (): void => {
    GameEngine.processEnemyTurn();
    setGameState(GameEngine.getState());
  };

  const value = {
    gameState,
    playCard,
    startGame,
    endTurn,
    processEnemyTurn,
  };

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = (): GameStateContextType => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error("useGameState must be used within a GameStateProvider");
  }
  return context;
};
