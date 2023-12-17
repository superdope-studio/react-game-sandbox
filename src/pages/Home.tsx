import { Container, Box, Button } from "@mui/material";
import { useLocation } from "wouter";

export const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setLocation] = useLocation();
  return (
    <Container>
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
