import { Typography, TextField, Grid, Stack } from "@mui/material";
import { useState } from "react";

/**
 * Renders the rescued data.
 * @returns The JSX element representing the rescued data.
 */
const RescuedData = () => {
  const [rescued, setRescued] = useState(0);
  const [medicalized, setMedicalized] = useState(0);
  const [deceased, setDeceased] = useState(0);
  const [boatRegistration, setBoatRegistration] = useState("");
  return (
    <Grid container spacing={1}>
      <Grid container item spacing={3}>
        <Grid item xs={3}>
          <Typography>Nombre de personnes assistées </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            name="rescued"
            value={rescued}
            onChange={(event) => {
              setRescued(parseInt(event.target.value));
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography>Nombre de personnes médicalisées </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            name="medicalized"
            value={medicalized}
            onChange={(event) => {
              setMedicalized(parseInt(event.target.value));
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography>Nombre de personnes décédées </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            name="deceased"
            value={deceased}
            onChange={(event) => {
              setDeceased(parseInt(event.target.value));
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography>Immatriculation du bateau </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            type="text"
            name="boatRegistration"
            value={boatRegistration}
            onChange={(event) => {
              setBoatRegistration(event.target.value);
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default RescuedData;
