"use client";
import React from "react";
import Head from "next/head";
import { styled } from "@mui/material";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { IInterventionFormData } from "../components/reports/intervention/types";
import Database from "../model/db";
import InterventionForm from "../components/reports/intervention/form";
import dayjs from "dayjs";
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
  const methods = useForm<IInterventionFormData>({
    defaultValues: {
      startedAt: dayjs(),
      endedAt: dayjs(),
      date: dayjs(),
      pilote: [],
      crew: [],
      alarmedBy: [],
      severity: [],
      inteverntionType: [],
      otherMeans: [],
      causes: [],
      actionsTaken: [],
      interventionLocation: [],
      interventionDestination: [],
      remark: "",
      rescued: 0,
      medicalized: 0,
      deceased: 0,
      boatRegistration: "",
      eCoordinate: "2560250",
      nCoordinate: "1138470",
    },
  });
  console.log("InterventionForm");
  console.log(methods.formState.errors)
  const onSubmit: SubmitHandler<IInterventionFormData> = async (data) => {
    await Database.getInstance().addFormIntervention(data);
    window.location.href = "/forms_interventions";
  };
  return (
    <React.Fragment>
      <Head>
        <title>Rapport d'intervention</title>
      </Head>
      <Root>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <InterventionForm />
          </form>
        </FormProvider>
      </Root>
    </React.Fragment>
  );
}
