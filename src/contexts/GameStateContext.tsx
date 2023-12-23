import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  GameEngine,
  GameEngine as GameEngineClass,
  GameState,
} from "../gameEngine/GameEngineClass";

/**
 * this context is responsible for syncronizing the game state from the gameEngine
 * and the UI state that is passed down to components to drive the UI
 * this allows us to decouple the game state and the ui state
 */

const gameEngine = new GameEngineClass();

const GameStateContext = createContext<{
  gameEngine: GameEngine;
  gameState?: GameState;
}>({
  gameEngine,
  gameState: undefined,
});

export const GameStateProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState(gameEngine.getState());

  useEffect(() => {
    gameEngine.registerListener((state: GameState) => {
      setGameState(state);
    });
  }, []);

  return (
    <GameStateContext.Provider value={{ gameEngine, gameState }}>
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
