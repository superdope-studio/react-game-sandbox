import React from "react";
import { Box } from "@mui/material";
import { useDrag } from "react-dnd";

import { ItemTypes } from "../data/constants";
import { useGameState } from "../contexts/GameStateContext";
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
  const { gameState } = useGameState();
  const playerHand = gameState.playerHand;
  return (
    <Box sx={{ width: "100vw" }}>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <Box>Energy: {gameState.playerEnergy}</Box>
        <Box sx={{ textAlign: "center", marginBottom: "16px" }}>
          Player Hand
        </Box>
        <Box>Health: {gameState.playerHealth}</Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          maxHeight: "33vh",
          overflow: "scroll",
        }}
      >
        {playerHand.map((card: GameCard, idx) => (
          <DraggagleWrapper key={idx} index={idx} gameCard={card}>
            <CardComponent gameCard={card} index={idx} />
          </DraggagleWrapper>
        ))}
      </Box>
    </Box>
  );
};
