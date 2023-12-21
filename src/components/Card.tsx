import { Box, Card, CardContent, Typography } from "@mui/material";

import type { GameCard } from "../data/cards";

export const CardComponent = ({
  gameCard,
}: {
  gameCard: GameCard;
  index: number;
}) => {
  if (!gameCard) {
    return null;
  }
  return (
    <Card
      sx={{
        minWidth: "120px",
        maxWidth: 400,
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: "8px",
        marginRight: "8px",
        marginBottom: "16px",
        height: "99%",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14, fontWeight: 600 }}
          color="text.primary"
          gutterBottom
        >
          {gameCard.title}
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
          <Box>Damage: {gameCard.damage}</Box>
          <Box>Cost: {gameCard.energyCost}</Box>
        </Box>
      </CardContent>
    </Card>
  );
};
