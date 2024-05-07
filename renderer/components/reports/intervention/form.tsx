import { Stack, Typography, Divider, Button } from "@mui/material";
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
      <Stack
        spacing={2}
        direction={"row"}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h5">Equipage : </Typography>
        <PiloteSelect allowCreate={true} />
        <CrewSelect allowCreate={true}/>
      </Stack>
      <Divider />
      <Stack
        spacing={2}
        direction={"row"}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h5">Alarmé par : </Typography>
        <AlarmedBySelect allowCreate={true} />
        <Typography variant="h5">Gravité de l'intervention : </Typography>
        <SeveritySelect allowCreate={false} />
      </Stack>
      <Divider />
      <Stack
        spacing={2}
        direction={"row"}
        justifyContent="center"
        alignItems="center"
      >
        <div>
          <Typography variant="h5">Type d'intervention : </Typography>
          <InterventionTypeSelect allowCreate={false}/>
        </div>
        <div>
          <Typography variant="h5">Autre moyens engagés : </Typography>
          <OtherMeansSelect allowCreate={true}></OtherMeansSelect>
        </div>
      </Stack>
      <RescuedData />
      <Stack
        spacing={2}
        direction={"row"}
        justifyContent="center"
        alignItems="center"
      >
        <div>
          <Typography variant="h5">Cause : </Typography>
          <CauseSelect allowCreate={true} />
        </div>
        <div>
          <Typography variant="h5">Mesure prises : </Typography>
          <ActionTakenSelect allowCreate={true} />
        </div>
      </Stack>

      <Stack
        spacing={2}
        direction={"column"}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h5">Localisation : </Typography>
        <LocationData />
        <InterventionLocationSelect allowCreate={true} />
        <Typography variant="h5">Ramené à/au : </Typography>
        <InterventionDestinationSelect allowCreate={true} />
      </Stack>
      <Stack
        spacing={2}
        direction={"column"}
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h5">Remarque : </Typography>
      </Stack>
      <Remark />
      <Button variant="contained" color="primary" type="submit">
        {" "}
        Soummettre
      </Button>
    </div>
  );
};
export default InterventionForm;
