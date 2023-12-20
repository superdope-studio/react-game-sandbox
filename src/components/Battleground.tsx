import { ItemTypes } from "../data/constants";
import { useDrop } from "react-dnd";
import { Box } from "@mui/material";

import { useGameState } from "../contexts/GameStateContext";
import { GameCard } from "../data/cards";
import { CardComponent } from "./Card";

export const Battleground = () => {
  const { gameState, playCard } = useGameState();
  const battleground = gameState.battleground;

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop: ({ index }: { index: number }) => playCard(index),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [gameState]
  );

  return (
    <Box
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Box textAlign="center">
        Battleground ({gameState.battleground.length} cards)
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          maxHeight: "33vh",
          overflow: "scroll",
        }}
      >
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
            zIndex: 4,
            opacity: 0.5,
            backgroundColor: "yellow",
          }}
        />
      )}
    </Box>
  );
};
