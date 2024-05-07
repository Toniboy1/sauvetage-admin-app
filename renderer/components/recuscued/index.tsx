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
  const [boatRegistration, setBoatRegistration] = useState("VD");
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Stack
          spacing={2}
          direction={"row"}
          justifyContent="center"
          alignItems="center"
        >
          <Typography>Nombre de personnes assistées </Typography>
          <TextField
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            name="rescued"
            value={rescued}
            onChange={(event) => {
              setRescued(parseInt(event.target.value));
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack
          spacing={2}
          direction={"row"}
          justifyContent="center"
          alignItems="center"
        >
          <Typography>Nombre de personnes médicalisées </Typography>
          <TextField
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            name="medicalized"
            value={medicalized}
            onChange={(event) => {
              setMedicalized(parseInt(event.target.value));
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack
          spacing={2}
          direction={"row"}
          justifyContent="center"
          alignItems="center"
        >
          <Typography>Nombre de personnes décédées </Typography>
          <TextField
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            name="deceased"
            value={deceased}
            onChange={(event) => {
              setDeceased(parseInt(event.target.value));
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack
          spacing={2}
          direction={"row"}
          justifyContent="center"
          alignItems="center"
        >
          <Typography>Immatriculation du bateau </Typography>
          <TextField
            type="text"
            name="boatRegistration"
            value={boatRegistration}
            onChange={(event) => {
              setBoatRegistration(event.target.value);
            }}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};
export default RescuedData;
