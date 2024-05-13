import { Grid, Stack, TextField } from "@mui/material";
import { InputMask, type InputMaskProps } from "@react-input/mask";
import { forwardRef, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IInterventionFormData } from "../../reports/intervention/types";

/**
 * A forward ref component for the InputMask component.
 */
const ForwardedInputMaskCoordinate = forwardRef<
  HTMLInputElement,
  InputMaskProps
>((props, forwardedRef) => {
  return (
    <InputMask ref={forwardedRef} mask="9'999'999" replacement="9" {...props} />
  );
});
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
              <TextField
                label="°N"
                {...field}
                InputProps={{
                  inputComponent: ForwardedInputMaskCoordinate,
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="eCoordinate"
            render={({ field }) => (
              <Controller
                control={control}
                name="eCoordinate"
                render={({ field }) => (
                  <TextField
                    label="°E"
                    {...field}
                    InputProps={{
                      inputComponent: ForwardedInputMaskCoordinate,
                    }}
                  />
                )}
              />
            )}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default LocationData;
