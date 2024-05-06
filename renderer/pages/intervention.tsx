"use client"
import React from "react";
import Head from "next/head";
import { Button, Divider, Stack, styled, Typography } from "@mui/material";
import DateTimeIntervention from "../components/time";
import People from "../components/people";
import Alarm from "../components/alarm";
import Severity from "../components/severities";
import InterventionTypes from "../components/interventions";
import OtherMean from "../components/otherMeans";
import RescuedData from "../components/recuscued";
import Causes from "../components/causes";
import Actions from "../components/actions";
import LocationData from "../components/location/coordinates";
import CommonLocation from "../components/location/commons";
import dynamic from "next/dynamic";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import { IInterventionFormData } from "../components/reports/intervention/types";
import { ErrorMessage } from "@hookform/error-message"
const Remark = dynamic(() => import("../components/remark"), { ssr: false });
/**
 * Root component for the intervention page.
 */
const Root = styled("div")(({ theme }) => {
  return {
    textAlign: "center",
    paddingTop: theme.spacing(4),
  };
});

/**
 * Renders the Intervention page.
 * @returns The JSX element representing the Intervention page.
 */
export default function Intervention() {
  const methods = useForm<IInterventionFormData>()
  const onSubmit: SubmitHandler<IInterventionFormData> = (data) => {
    console.log("Submitting data", data);
  }
  return (
    <React.Fragment>
      <Head>
        <title>Rapport d'intervention</title>
      </Head>
      <Root>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <ErrorMessage
              errors={methods.formState.errors}
              name="singleErrorInput"
              render={({ message }) => <p>{message}</p>}
            />
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
          </form>
        </FormProvider>
      </Root>
    </React.Fragment>
  );
}
