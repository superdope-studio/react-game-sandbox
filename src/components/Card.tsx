import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import type { GameCard } from "../data/cards";

export const CardComponent = ({ gameCard }: { gameCard: GameCard }) => {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 400 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {gameCard.title}
        </Typography>
        <Typography variant="h5" component="div"></Typography>

        <Typography variant="body2">{gameCard.description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View Details</Button>
      </CardActions>
    </Card>
  );
};
