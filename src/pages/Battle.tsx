import { Box, Card, Divider, Grid, Stack } from "@mui/material";
import { BattleField, CardType, ZoneType } from "../data/cards";
import { CardZone } from "../components/CardZone";
import { Deck } from '../components/Deck';

export const Battle = () => {
  return <Box sx={{ paddingTop: "64px", display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
      <BattleFieldZone />
      <Divider orientation="horizontal" sx={{ padding: 10 }} />
      <PlayerBattleFieldZone />
    </Box>;
};

const graveyardZone: ZoneType = {
  title: 'Graveyard',
  description: 'Dead cards go here',
  isTapped: false,
  type: CardType.Graveyard,
}

const BattleFieldZone = () => {
  return <Stack direction="row"
  divider={<Divider orientation="vertical" flexItem />}>
      <Box sx={{ margin: '10px' }} m={6}>
        <Deck />
        <CardZone  zoneType={graveyardZone} />
      </Box>
      <Grid container>
        {BattleField.map((zoneType: ZoneType) => (
          <Grid item m={5}>
            <CardZone zoneType={zoneType} />
          </Grid>
        ))}
      </Grid>
  </Stack>
}

const PlayerBattleFieldZone = () => {
  return <Stack direction="row"
  divider={<Divider orientation="vertical" flexItem />}>
      <Grid container>
        {BattleField.map((zoneType: ZoneType) => (
          <Grid item m={5}>
            <CardZone zoneType={zoneType} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ margin: '10px' }} m={6}>
        <CardZone  zoneType={graveyardZone} />
        <Deck />
      </Box>
  </Stack>
}