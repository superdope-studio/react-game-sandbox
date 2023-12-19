import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useDrag } from "react-dnd";
import type { GameCard } from "../data/cards";
import { ItemTypes } from "../pages/Battle";

export const CardComponent = ({
  gameCard,
  index,
}: {
  gameCard: GameCard;
  index: number;
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Card
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: "bold",
        cursor: "move",
      }}
      sx={{ minWidth: 275, maxWidth: 400 }}
    >
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
