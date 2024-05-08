import { Typography, TextField, Grid } from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

/**
 * Renders the rescued data.
 * @returns The JSX element representing the rescued data.
 */
const RescuedData = () => {
  const { control, getValues, setValue, register } = useFormContext();
  const initialRescued = getValues("rescued");
  const initialMedicalized = getValues("medicalized");
  const initialDeceased = getValues("deceased");
  const initialBoatRegistration = getValues("boatRegistration");

  if (initialRescued) setValue("rescued", initialRescued);
  if (initialMedicalized) setValue("medicalized", initialMedicalized);
  if (initialDeceased) setValue("deceased", initialDeceased);
  if (initialBoatRegistration)
    setValue("boatRegistration", initialBoatRegistration);
  return (
    <Grid container spacing={1}>
      <Grid container item spacing={3}>
        <Grid item xs={3}>
          <Typography variant="h6">Nombre de personnes assistées </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            {...register("rescued")}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">
            Nombre de personnes médicalisées{" "}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            {...register("medicalized")}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">Nombre de personnes décédées </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            {...register("deceased")}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">Immatriculation du bateau </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField type="text" {...register("boatRegistration")} />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default RescuedData;
