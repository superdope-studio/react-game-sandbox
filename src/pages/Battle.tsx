import { Box } from "@mui/material";

import { PlayerHand } from "../components/PlayerHand";
import { Battleground } from "../components/Battleground";

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
        <Battleground />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
        <PlayerHand />
      </Box>
    </Box>
  );
};
