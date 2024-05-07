import { Typography, TextField, Grid, Stack } from "@mui/material";
import { useState } from "react";
import InputMask from "react-input-mask";

/**
 * Renders the location data component.
 * @returns JSX element representing the location data component.
 */
const LocationData = () => {
  const [nCoordinate, setNCoordinate] = useState("2560250");
  const [eCoordinate, setECoordinate] = useState("1138470");

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Stack
          spacing={2}
          direction={"row"}
          justifyContent="center"
          alignItems="center"
        >
          <Typography>Coordonnées :</Typography>
          <InputMask
            mask={"9'999'999°N"}
            value={nCoordinate}
            onChange={(event) => {
              setNCoordinate(event.target.value);
            }}
            disabled={false}
            maskChar=" "
          >
            {() => <TextField label="°N" name="n-coordinate" />}
          </InputMask>
          <InputMask
            mask={"9'999'999°E"}
            value={eCoordinate}
            onChange={(event) => {
              setECoordinate(event.target.value);
            }}
            disabled={false}
            maskChar=" "
          >
            {() => <TextField label="°E" name="e-coordinate" />}
          </InputMask>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default LocationData;
