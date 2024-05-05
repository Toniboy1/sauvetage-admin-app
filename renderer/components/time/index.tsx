import * as React from 'react';

import dayjs from 'dayjs';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';


export default function DateTimeIntervention() {
  const valueStartedAt = dayjs()
  const valueEndedAt = dayjs()
  const valueDate = dayjs()
  const [startedAt, setStartedAt] = React.useState(valueStartedAt);
  const [endedAt, setEndedAt] = React.useState(valueEndedAt);
  const [date, setDate] = React.useState(valueDate);
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>

          <Grid container spacing={3}>
            <Grid item xs>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Typography variant="h6" gutterBottom >
                  Heure alarme
                </Typography>
                <TimePicker  defaultValue={valueStartedAt} value={startedAt} onChange={setStartedAt}/>
              </Stack>
            </Grid>
            <Grid item xs>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Typography variant="h6" gutterBottom>
                  Heure de fin
                </Typography>
                <TimePicker defaultValue={valueEndedAt} value={endedAt} onChange={setEndedAt}/>
              </Stack>
            </Grid>
            <Grid item xs>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Typography variant="h6" gutterBottom>
                  Date
                </Typography>
                <DatePicker value={date} onChange={setDate}/>
              </Stack>
            </Grid>
          </Grid>
      </CardContent>
    </Card>
  );
}
