import Home from "@mui/icons-material/Home";
import { AppBar, Typography, Box, IconButton } from "@mui/material";
import { useLocation } from "wouter";

export const Header = () => {
  const [location, setLocation] = useLocation();

  let title = "";
  let showIcon = false;

  switch (location) {
    case "/react-game-sandbox":
      title = "Home";
      showIcon = false;
      break;

    case "/react-game-sandbox/":
      title = "Home";
      showIcon = false;
      break;

    case "/react-game-sandbox/deck":
      title = "Deck";
      showIcon = true;
      break;

    case "/react-game-sandbox/battle":
      title = "Battle";
      showIcon = true;
      break;
    default:
      break;
  }

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          padding: "10px",
          display: "flex",
          flexDirection: "row",
          height: "50px",
        }}
      >
        {showIcon && (
          <IconButton
            onClick={() => {
              setLocation("/react-game-sandbox/");
            }}
          >
            <Home sx={{ color: "white" }} />
          </IconButton>
        )}
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          {title}
        </Typography>
      </AppBar>
    </Box>
  );
};
