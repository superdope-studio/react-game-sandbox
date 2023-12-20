import { Box, Card, CardContent } from "@mui/material";
import { useGameState } from "../contexts/GameStateContext";
import { GameCard } from "../data/cards";

const CardBack = () => {
  return (
    <Box sx={{ margin: "8px" }}>
      <Card>
        <CardContent>No Lookie</CardContent>
      </Card>
    </Box>
  );
};

export const EnemyArea = () => {
  const { gameState } = useGameState();

  return (
    <Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-around", width: "100vw" }}
      >
        <Box>Energy: {gameState.enemyEnergy}</Box>
        <Box>
          {!gameState.playerTurn && (
            <Box sx={{ fontWeight: 600 }}>Current Turn</Box>
          )}
          Enemy Area
        </Box>
        <Box>Health: {gameState.enemyHealth}</Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          maxHeight: "33vh",
          overflow: "scroll",
        }}
      >
        {gameState.enemyHand.map((card: GameCard, idx) => (
          <Box key={idx}>
            <CardBack />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
