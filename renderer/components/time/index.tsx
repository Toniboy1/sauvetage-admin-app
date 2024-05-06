import * as React from "react";

import dayjs from "dayjs";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

/**
 * Component for the date and time of the intervention.
 * @returns The JSX element representing the date and time of the intervention.
 */
const DateTimeIntervention = () => {
  const { control } = useFormContext()
  const valueStartedAt = dayjs();
  const valueEndedAt = dayjs();
  const valueDate = dayjs();
  const [startedAt, setStartedAt] = React.useState(valueStartedAt);
  const [endedAt, setEndedAt] = React.useState(valueEndedAt);
  const [date, setDate] = React.useState(valueDate);
  return (
    <Card sx={{ minWidth: 275 }}>
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
                defaultValue={valueStartedAt}
                render={({ field }) => {
                  return <TimePicker {...field} value={startedAt} onChange={setStartedAt} />;
                }
                }
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
                defaultValue={valueEndedAt}
                render={({ field }) => {
                  return <TimePicker {...field} value={endedAt} onChange={setEndedAt} />;
                }
                }
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
                defaultValue={valueDate}
                render={({ field }) => {
                  return <DatePicker {...field} value={date} onChange={setDate} />;
                }
                }
              />
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
export default DateTimeIntervention;
