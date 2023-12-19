import React from "react";
import { Box } from "@mui/material";
import { useDrag } from "react-dnd";

import { ItemTypes } from "../data/constants";
import { useGameState } from "../contexts/GameStateContext";
import { GameCard } from "../data/cards";
import { CardComponent } from "./Card";

const DraggagleWrapper = ({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Box
      ref={drag}
      sx={{
        minWidth: 275,
        maxWidth: 400,
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
      <Box sx={{ textAlign: "center" }}>
        Player Hand ({gameState.playerHand.length} cards)
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
          <DraggagleWrapper key={idx} index={idx}>
            <CardComponent gameCard={card} index={idx} />
          </DraggagleWrapper>
        ))}
      </Box>
    </Box>
  );
};