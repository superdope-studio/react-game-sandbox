import { ItemTypes } from "../data/constants";
import { useDrop } from "react-dnd";
import { Box } from "@mui/material";

import { useGameState } from "../contexts/GameStateContext";
import { GameCard } from "../data/cards";
import { CardComponent } from "./Card";
import { cardCanBePlayed } from "../gameEngine/gameEngine";

export const Battleground = () => {
  const { gameState, playCard } = useGameState();
  const battleground = gameState.globalState.battleground;

  const [{ isOver, isValid }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop: ({ index, gameCard }: { index: number; gameCard: GameCard }) => {
        // if the card is valid, allow drop action
        if (cardCanBePlayed(gameCard)) {
          playCard(index);
        }
      },
      collect: (monitor) =>
      // collector runs while dragging is happening
      // use to change the UI while dragging
      ({
        isOver: !!monitor.isOver(),
        isValid:
          monitor.getItem() && cardCanBePlayed(monitor.getItem()?.gameCard),
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
        Battleground ({battleground.length} cards)
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
            backgroundColor: isValid ? "green" : "red",
          }}
        />
      )}
    </Box>
  );
};
