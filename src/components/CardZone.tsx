import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
  } from "@mui/material";
import { ZoneType } from "../data/cards";

  export const CardZone = ({ zoneType }: { zoneType: ZoneType }) => {
    return (
        <Card variant='outlined' sx={{ minWidth: 280, maxWidth: 400, minHeight: 150 }}>
         <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {zoneType.title}
            </Typography>
            <Typography variant="h5" component="div"></Typography>
            <Typography variant="body2">{zoneType.description}</Typography>
         </CardContent>
        </Card>
    )
  }