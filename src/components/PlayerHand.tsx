import React from "react";
import { Box, Button } from "@mui/material";
import { useDrag } from "react-dnd";

import { ItemTypes } from "../data/constants";
import { GameStateProvider, useGameState } from "../contexts/GameStateContext";
import { GameCard } from "../data/cards";
import { CardComponent } from "./Card";

const DraggagleWrapper = ({
  index,
  gameCard,
  children,
}: {
  index: number;
  gameCard: GameCard;
  children: React.ReactNode;
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { index, gameCard },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [gameCard]
  );

  return (
    <Box
      ref={drag}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: "bold",
        cursor: "move",
      }}
    >
      {children}
    </Box>
  );
};

export const PlayerHand = () => {
  const gameEngine = useGameState();
  const player = gameEngine.getHuman();
  const state = gameEngine.getState();
  return (
    <Box sx={{ width: "100vw" }}>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <Box>Energy: {player.energy}</Box>
        <Box sx={{ textAlign: "center", marginBottom: "16px" }}>
          {state.globalState.currentTurn === "Human" && (
            <Box sx={{ fontWeight: 600 }}>Current Turn</Box>
          )}
          Player Hand
        </Box>
        <Box>Health: {player.health}</Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={gameEngine.passTurn} variant="contained">
          End Turn
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          // maxHeight: "33vh",
          padding: "16px",
          overflow: "scroll",
        }}
      >
        {player.hand.map((card: GameCard, idx) => (
          <DraggagleWrapper key={idx} index={idx} gameCard={card}>
            <CardComponent gameCard={card} index={idx} />
          </DraggagleWrapper>
        ))}
      </Box>
    </Box>
  );
};
