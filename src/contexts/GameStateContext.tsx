import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import * as GameEngine from "../gameEngine/gameEngine";
import { GameEngine as GameEngineClass } from "../gameEngine/GameEngineClass";

/**
 * this context is responsible for syncronizing the game state from the gameEngine
 * and the UI state that is passed down to components to drive the UI
 * this allows us to decouple the game state and the ui state
 */

const gameEngine = new GameEngineClass();
// TODO type this biatch
const GameStateContext = createContext(gameEngine);

export const GameStateProvider = ({
  children
}: { children: ReactNode }) => {
  const gameEngine = new GameEngineClass()
  const [gameState, setGameState] = useState(gameEngine.getState());

  gameEngine.registerListener(setGameState as any);


  const playCard = (cardIndex: number): void => {
    //  gameEngine.playCard(cardIndex);
    setGameState(gameEngine.getState());
  };

  const startGame = (): void => {
    gameEngine.startGame();
    setGameState(gameEngine.getState());
  };

  const endTurn = (): void => {
    //gameEngine.endPlayerTurn();
    setGameState(gameEngine.getState());
  };

  const processEnemyTurn = (): void => {
    // gameEngine.processEnemyTurn();
    setGameState(gameEngine.getState());
  };

  return (
    <GameStateContext.Provider value={{ gameState, playCard, startGame, endTurn, processEnemyTurn }}>
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
