import { Box } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { PlayerHand } from "../components/PlayerHand";
import BoardSquare from "../components/Battleground";

export const ItemTypes = {
  CARD: "card",
};

export const Battle = () => {
  return (
    <Box
      sx={{
        paddingTop: "64px",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
        Enemy Area
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
        <BoardSquare />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
        <PlayerHand />
      </Box>
    </Box>
  );
};
