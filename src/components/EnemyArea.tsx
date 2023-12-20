import { Box } from "@mui/material";
import { useGameState } from "../contexts/GameStateContext";

export const EnemyArea = () => {
  const { gameState } = useGameState();

  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-around", width: "100vw" }}
    >
      <Box>Energy: {gameState.enemyEnergy}</Box>
      <Box>Enemy Area</Box>
      <Box>Health: {gameState.enemyHealth}</Box>
    </Box>
  );
};
