import {
  Typography,
  Button,
  Grid,
  Stack,
  Box,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
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
import { useFormContext } from "react-hook-form";
import { IInterventionFormData } from "./types";
const Remark = dynamic(() => import("../../remark"), { ssr: false });

const InterventionForm = () => {
  return (
    <Box
      component="section"
      sx={{ p: 2, border: "1px dashed grey" }}
      padding={6}
    >
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
                <PiloteSelect allowCreate={true} required={true} />
              </Stack>
              <Stack spacing={4} direction="row">
                <Typography variant="h6">Equipage:</Typography>
                <CrewSelect
                  allowCreate={true}
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
                  <AlarmedBySelect allowCreate={true} required={true} />
                </Stack>
                <Stack spacing={4} direction="row">
                  <Typography variant="h6">
                    Gravité de l'intervention:
                  </Typography>
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
                  <CauseSelect allowCreate={true} required={true} />
                </Stack>
              </Stack>
              <Stack spacing={4} direction="column">
                <Stack spacing={4} direction="row">
                  <Typography variant="h6">Mesure prises:</Typography>
                  <ActionTakenSelect allowCreate={true} required={true} />
                </Stack>
                <Stack spacing={4} direction="row">
                  <Typography variant="h6">Autre moyens engagés:</Typography>
                  <OtherMeansSelect allowCreate={true} required={false} />
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
                      allowCreate={true}
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
                      allowCreate={true}
                      required={false}
                    />
                  </Stack>
                </Stack>
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
    </Box>
  );
};
export default InterventionForm;
