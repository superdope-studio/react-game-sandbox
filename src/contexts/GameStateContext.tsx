import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { GameEngine, GameState } from "../gameEngine/gameEngine";

/**
 * this context is responsible for syncronizing the game state from the gameEngine
 * and the UI state that is passed down to components to drive the UI
 * this allows us to decouple the game state and the ui state
 */

const gameEngine = new GameEngine();

const GameStateContext = createContext<{
  gameEngine: GameEngine;
  gameState?: GameState;
}>({
  gameEngine,
  gameState: undefined,
});

export const GameStateProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState(gameEngine.getState());

  // Game state is tracked in the GameEngine class
  // in order to update the state stored in this context (UI state)
  // we register a listener in the GameEngine class
  // this listener is fired after every GameEngine state update
  // and pushes state updates into the context, which cascades rerenders
  // down the component tree to update the entire UI
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
