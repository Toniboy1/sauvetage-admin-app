import { Typography, Button, Grid, Stack } from "@mui/material";
import LocationData from "../../location/coordinates";
import RescuedData from "../../recuscued";
import DateTimeIntervention from "../../time";
import dynamic from "next/dynamic";
import CrewSelect from "../../select/crew";
import PiloteSelect from "../../select/pilote";
import AlarmedBySelect from "../../select/alarmed_by";
import SeveritySelect from "../../select/severity";
import InterventionTypeSelect from "../../select/intervention_type";
import OtherMeansSelect from "../../select/other_means";
import CauseSelect from "../../select/cause";
import ActionTakenSelect from "../../select/actions_taken";
import InterventionDestinationSelect from "../../select/intervention_destination";
import InterventionLocationSelect from "../../select/intervention_location";
const Remark = dynamic(() => import("../../remark"), { ssr: false });
const InterventionForm = () => {
  return (
    <div>
      <DateTimeIntervention />
      <Grid container spacing={1} marginY={2}>
        <Grid container item spacing={3}>
          <Grid item xs={4}>
            <Typography variant="h5">Equipage : </Typography>
          </Grid>
          <Grid item xs={4}>
            <PiloteSelect allowCreate={true} />
          </Grid>
          <Grid item xs={4}>
            <CrewSelect allowCreate={true} />
          </Grid>
        </Grid>
        <Grid container item spacing={4} marginY={1}>
          <Grid item xs={3}>
            <Typography variant="h5">Alarmé par : </Typography>
          </Grid>
          <Grid item xs={3}>
            <AlarmedBySelect allowCreate={true} />
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h5">Gravité de l'intervention : </Typography>
          </Grid>
          <Grid item xs={3}>
            <SeveritySelect allowCreate={false} />
          </Grid>
        </Grid>
        <Grid container item spacing={4}>
          <Grid item xs={3}>
            <Typography variant="h5">Type d'intervention : </Typography>
          </Grid>
          <Grid item xs={3}>
            <InterventionTypeSelect allowCreate={false} />
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h5">Autre moyens engagés : </Typography>
          </Grid>
          <Grid item xs={3}>
            <OtherMeansSelect allowCreate={true}></OtherMeansSelect>
          </Grid>
        </Grid>
      </Grid>
      <RescuedData />
      <Grid container spacing={1} marginY={2}>
        <Grid container item spacing={4} marginY={1}>
          <Grid item xs={3}>
            <Typography variant="h5">Cause : </Typography>
          </Grid>
          <Grid item xs={3}>
            <CauseSelect allowCreate={true} />
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h5">Mesure prises : </Typography>
          </Grid>
          <Grid item xs={3}>
            <ActionTakenSelect allowCreate={true} />
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h5">Localisation : </Typography>
          </Grid>
          <Grid item xs={6}>
            <LocationData />
          </Grid>
          <Grid item xs={3}>
            <InterventionLocationSelect allowCreate={true} />
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h5">Ramené à/au : </Typography>
          </Grid>
          <Grid item xs={3}>
            <InterventionDestinationSelect allowCreate={true} />
          </Grid>
        </Grid>
      </Grid>
      <Typography variant="h5">Remarque : </Typography>
      <Remark />
      <Button variant="contained" color="primary" type="submit">
        {" "}
        Soummettre
      </Button>
    </div>
  );
};
export default InterventionForm;
