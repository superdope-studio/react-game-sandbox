import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { GameDeck } from "../data/cards";



export const DeckComponent = ({
    gameDeck,
    onSelect,
}: {
    gameDeck: GameDeck;
    onSelect: any;
    index: number;
}) => {
    return (
    <Card
    variant="outlined"
    sx={{
      minWidth: "140px",
      maxWidth: 400,
      fontSize: 25,
      fontWeight: "bold",
      marginLeft: "8px",
      marginRight: "8px",
      marginBottom: "16px",
      minheight: "220px",
    }}
  >
    <CardContent>
      <Typography
        sx={{ fontSize: 14, fontWeight: 600 }}
        color="text.primary"
        gutterBottom
      >
        {gameDeck.title}
      </Typography>
      <Box
        component={Typography}
        variant="body1"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>Card Count: {gameDeck.cards.length}</Box>
        <Box>Valid Deck: {gameDeck.cards.length >= 2 && gameDeck.cards.length <= 5 ? 'Yes' : 'No' }</Box>
        <Box>
            <Button onClick={() => onSelect(gameDeck.id)} variant="contained">View/Edit</Button>
        </Box>
      </Box>
    </CardContent>
  </Card>
    )
}