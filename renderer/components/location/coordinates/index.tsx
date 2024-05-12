import { Typography, TextField, Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputMask from "react-input-mask";
import { IInterventionFormData } from "../../reports/intervention/types";

/**
 * Renders the location data component.
 * @returns JSX element representing the location data component.
 */
const LocationData = () => {
  const { control, getValues, setValue, register } =
    useFormContext<IInterventionFormData>();
  useEffect(() => {
    const initialECoordinate = getValues("eCoordinate");
    const initialNCoordinate = getValues("nCoordinate");
    if (initialECoordinate) setValue("nCoordinate", initialECoordinate);
    if (initialNCoordinate) setValue("eCoordinate", initialECoordinate);
  }, [getValues, setValue]);
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Stack
          spacing={2}
          direction={"column"}
          justifyContent="center"
          alignItems="center"
        >
          <Controller
            control={control}
            name="nCoordinate"
            render={({ field }) => (
              <InputMask
                mask={"9'999'999°N"}
                value={field.value}
                onChange={(event) => {
                  setValue("nCoordinate", event.target.value);
                }}
                disabled={false}
                maskChar=" "
              >
                {() => <TextField label="°N" name={field.name} />}
              </InputMask>
            )}
          />
          <Controller
            control={control}
            name="eCoordinate"
            render={({ field }) => (
              <InputMask
                mask={"9'999'999°E"}
                value={field.value}
                onChange={(event) => {
                  setValue("eCoordinate", event.target.value);
                }}
                disabled={false}
                maskChar=" "
              >
                {() => <TextField label="°E" name={field.name} />}
              </InputMask>
            )}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default LocationData;
