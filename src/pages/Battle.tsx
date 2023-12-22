import { Box, Dialog } from "@mui/material";

import { PlayerHand } from "../components/PlayerHand";
import { Battleground } from "../components/Battleground";
import { useEffect } from "react";
import { useGameState } from "../contexts/GameStateContext";
import { EnemyArea } from "../components/EnemyArea";

export const Battle = () => {
  const gameEngine = useGameState();
  useEffect(() => {
    gameEngine.startGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        paddingTop: "64px",
        display: "flex",
        flexDirection: "column",
        height: "90vh",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
        <EnemyArea />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
        <Battleground />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
        <PlayerHand />
      </Box>
      <Dialog open={false}>
        <Box sx={{ padding: "16px" }}>
          <Box>Enemy Played This Card!</Box>
        </Box>
      </Dialog>
    </Box>
  );
};
