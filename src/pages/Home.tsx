import { Container, Box, Button } from "@mui/material";
import { useLocation } from "wouter";
import { useGameState } from "../contexts/GameStateContext";

export const Home = () => {
  const [, setLocation] = useLocation();
  const { gameEngine } = useGameState();
  return (
    <Container sx={{ paddingTop: "64px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", padding: "40px" }}>
        <Button
          onClick={() => {
            setLocation("/deck");
          }}
        >
          View Demo Deck
        </Button>
        <Button
          onClick={() => {
            gameEngine.startGame();
            setLocation("/battle");
          }}
        >
          Battle!
        </Button>
      </Box>
    </Container>
  );
};
