import { Box, Button } from "@mui/material";

import { GameCard, GameDeck, exampleDecks } from "../data/cards";
import { CardComponent } from "../components/Card";
import { DeckComponent } from "../components/Deck";
import { useState } from "react";

export const DeckView = () => {
  const [selectedDeck, setSelectedDeck] = useState<number>();

  const selectedDeckObject = selectedDeck !== null ? exampleDecks.find(deck => deck.id === selectedDeck) : null;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        paddingTop: "64px",
      }}
    >
      <Box sx={{ borderRight: 2, borderRightColor: 'black'}}>
        {
          exampleDecks.map((gameDeck: GameDeck, idx) => (
            <DeckComponent gameDeck={gameDeck} onSelect={setSelectedDeck} index={idx} />
          ))
        }
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {selectedDeckObject && selectedDeckObject.cards.map((gameCard: GameCard, idx) => (
        <Box sx={{ margin: "10px" }}>
          <CardComponent gameCard={gameCard} key={gameCard.title} index={idx} />
        </Box>
      ))}
      </Box>
      <Box>
      { selectedDeckObject && <Button onClick={ () => setSelectedDeck(0)} variant="contained">
        Save
        </Button>
      }
      </Box>
      </Box>
    </Box>
  );
};
