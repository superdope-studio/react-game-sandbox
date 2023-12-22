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
  const gameEngine = useGameState();
  const enemy = gameEngine.getAi();
  const state = gameEngine.getState();

  return (
    <Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-around", width: "100vw" }}
      >
        <Box>Energy: {enemy.energy}</Box>
        <Box>
          {state.globalState.currentTurn === "AI" && (
            <Box sx={{ fontWeight: 600 }}>Current Turn</Box>
          )}
          Enemy Area
        </Box>
        <Box>Health: {enemy.health}</Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          maxHeight: "33vh",
          overflow: "scroll",
        }}
      >
        {enemy.hand.map((card: GameCard, idx) => (
          <Box key={idx}>
            <CardBack />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
