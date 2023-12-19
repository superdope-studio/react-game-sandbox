import { Box } from "@mui/material";
import { useGameState } from "../contexts/GameStateContext";
import { GameCard } from "../data/cards";
import { CardComponent } from "./Card";

export const PlayerHand = () => {
  const { gameState, setGameState } = useGameState();
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
          <Box key={idx}>
            <CardComponent gameCard={card} index={idx} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
