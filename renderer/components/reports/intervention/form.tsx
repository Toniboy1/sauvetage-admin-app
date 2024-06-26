import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import LocationData from "../../location/coordinates";
import RescuedData from "../../recuscued";
import Remark from "../../remark";
import ActionTakenSelect from "../../select/actions_taken";
import AlarmedBySelect from "../../select/alarmed_by";
import CauseSelect from "../../select/cause";
import CrewSelect from "../../select/crew";
import InterventionDestinationSelect from "../../select/intervention_destination";
import InterventionLocationSelect from "../../select/intervention_location";
import InterventionTypeSelect from "../../select/intervention_type";
import LakeStates from "../../select/lake_state";
import OtherMeansSelect from "../../select/other_means";
import PiloteSelect from "../../select/pilote";
import SeveritySelect from "../../select/severity";
import WeatherSelect from "../../select/weather";
import Winds from "../../select/wind";
import DateTimeIntervention from "../../time";

const InterventionForm = () => {
  return (
    <Stack spacing={2}>
      <DateTimeIntervention />
      <Card>
        <CardHeader title="Personnel engagé" />
        <CardContent>
          <Stack
            spacing={12}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Stack spacing={4} direction="row">
              <Typography variant="h6">Pilote:</Typography>
              <PiloteSelect allowCreate={false} required={true} />
            </Stack>
            <Stack spacing={4} direction="row">
              <Typography variant="h6">Equipage:</Typography>
              <CrewSelect
                allowCreate={false}
                required={false}
                multiple={true}
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Déroulement" />
        <CardContent>
          <Stack
            spacing={12}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Stack spacing={4} direction="column">
              <Stack spacing={4} direction="row">
                <Typography variant="h6">Alarmé par:</Typography>
                <AlarmedBySelect allowCreate={false} required={true} />
              </Stack>
              <Stack spacing={4} direction="row">
                <Typography variant="h6">Gravité de l'intervention:</Typography>
                <SeveritySelect allowCreate={false} required={true} />
              </Stack>
            </Stack>
            <Stack spacing={4} direction="column">
              <Stack spacing={4} direction="row">
                <Typography variant="h6">Type d'intervention:</Typography>
                <InterventionTypeSelect allowCreate={false} required={true} />
              </Stack>
              <Stack spacing={4} direction="row">
                <Typography variant="h6">Cause:</Typography>
                <CauseSelect allowCreate={false} required={true} />
              </Stack>
            </Stack>
            <Stack spacing={4} direction="column">
              <Stack spacing={4} direction="row">
                <Typography variant="h6">Mesure prises:</Typography>
                <ActionTakenSelect allowCreate={false} required={true} />
              </Stack>
              <Stack spacing={4} direction="row">
                <Typography variant="h6">Autre moyens engagés:</Typography>
                <OtherMeansSelect allowCreate={false} required={false} />
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Personnes secourues" />
        <CardContent>
          <RescuedData />
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Localisation" />
        <CardContent>
          <Stack
            spacing={12}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Stack spacing={4} direction="row">
              <Stack
                spacing={4}
                direction="row"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography variant="h6">Coordonnées:</Typography>
                <LocationData />
              </Stack>
              <Stack spacing={4} direction="column">
                <Stack
                  spacing={4}
                  direction="row"
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Typography variant="h6">Lieux d'intervention:</Typography>
                  <InterventionLocationSelect
                    allowCreate={false}
                    required={true}
                  />
                </Stack>
                <Stack
                  spacing={4}
                  direction="row"
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Typography variant="h6">Ramené à/au:</Typography>
                  <InterventionDestinationSelect
                    allowCreate={false}
                    required={false}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Conditions" />
        <CardContent>
          <Stack
            spacing={12}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Stack spacing={4} direction="row">
              <Typography variant="h6">Temps:</Typography>
              <WeatherSelect allowCreate={false} required={true} />
            </Stack>
            <Stack spacing={4} direction="row">
              <Typography variant="h6">Lac:</Typography>
              <LakeStates allowCreate={false} required={true} />
            </Stack>
            <Stack spacing={4} direction="row">
              <Typography variant="h6">Vent:</Typography>
              <Winds allowCreate={false} required={true} />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <Typography variant="h6">Remarque:</Typography>
      <Remark />

      {/* Submit Button */}
      <Button variant="contained" color="primary" type="submit">
        Soumettre
      </Button>
    </Stack>
  );
};
export default InterventionForm;
