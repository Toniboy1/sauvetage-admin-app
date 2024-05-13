import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

/**
 * Component for the date and time of the intervention.
 * @returns The JSX element representing the date and time of the intervention.
 */
const DateTimeIntervention = () => {
  const { control, getValues, setValue } = useFormContext();

  // Fetch initial values from form context and set them using setValue
  useEffect(() => {
    const initialStartedAt = getValues("startedAt");
    const initialEndedAt = getValues("endedAt");
    const initialDate = getValues("date");

    if (initialStartedAt) setValue("startedAt", dayjs(initialStartedAt));
    if (initialEndedAt) setValue("endedAt", dayjs(initialEndedAt));
    if (initialDate) setValue("date", dayjs(initialDate));
  }, [getValues, setValue]);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader title="Date et heure de l'intervention" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Typography variant="h6" gutterBottom>
                Heure alarme
              </Typography>
              <Controller
                control={control}
                name="startedAt"
                rules={{ required: true }}
                render={({ field }) => <TimePicker {...field} />}
              />
            </Stack>
          </Grid>
          <Grid item xs>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Typography variant="h6" gutterBottom>
                Heure de fin
              </Typography>
              <Controller
                control={control}
                name="endedAt"
                rules={{ required: true }}
                render={({ field }) => <TimePicker {...field} />}
              />
            </Stack>
          </Grid>
          <Grid item xs>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Typography variant="h6" gutterBottom>
                Date
              </Typography>
              <Controller
                control={control}
                name="date"
                rules={{ required: true }}
                render={({ field }) => <DatePicker {...field} />}
              />
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DateTimeIntervention;
