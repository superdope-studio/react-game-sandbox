import { Container, Box, Button } from "@mui/material";
import { useLocation } from "wouter";

export const Home = () => {
  const [, setLocation] = useLocation();
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
            setLocation("/battle");
          }}
        >
          Battle!
        </Button>
      </Box>
    </Container>
  );
};
