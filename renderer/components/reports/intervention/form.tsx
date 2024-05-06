import { Stack, Typography, Divider, Button } from "@mui/material"
import Actions from "../../actions"
import Alarm from "../../alarm"
import Causes from "../../causes"
import CommonLocation from "../../location/commons"
import LocationData from "../../location/coordinates"
import OtherMean from "../../otherMeans"
import People from "../../people"
import RescuedData from "../../recuscued"
import Severity from "../../severities"
import DateTimeIntervention from "../../time"
import InterventionTypes from "../../interventions"
import dynamic from "next/dynamic"
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
                <People peopleType="pilote" />
                <People peopleType="crew" />

            </Stack>
            <Divider />
            <Stack spacing={2} direction={"row"} justifyContent="center" alignItems="center">
                <Typography variant="h5">Alarmé par : </Typography>
                <Alarm labelText="" />
                <Typography variant="h5">Gravité de l'intervention : </Typography>
                <Severity />
            </Stack>
            <Divider />
            <Stack spacing={2} direction={"row"} justifyContent="center" alignItems="center">
                <div>
                    <Typography variant="h5">Type d'intervention : </Typography>
                    <InterventionTypes labelText=""></InterventionTypes>
                </div>
                <div>
                    <Typography variant="h5">Autre moyens engagés : </Typography>
                    <OtherMean labelText=""></OtherMean>
                </div>
            </Stack>
            <RescuedData />
            <Stack spacing={2} direction={"row"} justifyContent="center" alignItems="center">
                <div>
                    <Typography variant="h5">Cause : </Typography>
                    <Causes labelText="" />
                </div>
                <div>
                    <Typography variant="h5">Mesure prises : </Typography>
                    <Actions labelText="" />
                </div>
            </Stack>

            <Stack spacing={2} direction={"column"} justifyContent="center" alignItems="center">
                <Typography variant="h5">Localisation : </Typography>
                <LocationData />
                <CommonLocation labelText="" />
                <Typography variant="h5">Ramené à/au : </Typography>
                <CommonLocation labelText="" />
            </Stack>
            <Stack spacing={2} direction={"column"} alignItems="center" justifyContent="center">
                <Typography variant="h5">Remarque : </Typography>
            </Stack>
            <Remark />
            <Button variant="contained" color="primary" type="submit"> Soummettre</Button>
        </div>
    )
}
export default InterventionForm;