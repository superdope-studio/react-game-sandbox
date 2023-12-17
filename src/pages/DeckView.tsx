import { Box } from "@mui/material";
import { GameCard, playerDeck } from "../data/cards";
import { CardComponent } from "../components/Card";

export const DeckView = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "64px",
      }}
    >
      {playerDeck.map((gameCard: GameCard) => (
        <Box sx={{ margin: "10px" }}>
          <CardComponent gameCard={gameCard} key={gameCard.title} />
        </Box>
      ))}
    </Box>
  );
};
