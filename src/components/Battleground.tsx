import React from "react";
import { ItemTypes } from "../pages/Battle";
import { useDrop } from "react-dnd";
import { Box, Button } from "@mui/material";
import { useGameState } from "../contexts/GameStateContext";
import { GameCard } from "../data/cards";
import { CardComponent } from "./Card";

function Battleground({ x, y, children }: any) {
  const { gameState, setGameState } = useGameState();
  const battleground = gameState.battleground;

  const updateGameState = (arg: any) => {
    setGameState(arg);
  };

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop: ({ index }: { index: number }) => {
        const card = gameState.playerHand[index];
        const newBattleground = gameState.battleground.concat([card]);
        updateGameState((prevState: any) => ({
          ...prevState,
          battleground: newBattleground,
        }));
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [gameState, setGameState, updateGameState]
  );

  return (
    <div
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Box>
        <Box>Battleground</Box>
        {battleground.map((card: GameCard, idx) => (
          <Box key={idx}>
            <CardComponent gameCard={card} index={idx} />
          </Box>
        ))}
      </Box>
      {isOver && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: "yellow",
          }}
        />
      )}
    </div>
  );
}

export default Battleground;
