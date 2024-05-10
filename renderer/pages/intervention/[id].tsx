"use client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Head from "next/head";
import { styled } from "@mui/material";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { IInterventionFormData } from "../../components/reports/intervention/types";
import Database from "../../model/db";
import InterventionForm from "../../components/reports/intervention/form";
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
const EditIntervention = () => {
  const router = useRouter();
  const { id } = router.query;
  const formId = parseInt(id as string);
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
      eCoordinate: "",
      nCoordinate: "",
    },
  });
  const onSubmit: SubmitHandler<IInterventionFormData> = async (data) => {
    await Database.getInstance().updateFormIntervention(formId, data);
    window.location.href = "/forms_interventions";
  };
  useEffect(() => {
    if (id) {
      Database.getInstance().getFormIntervention(formId)
        .then((form) => {
          methods.reset(form);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);
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
};
export default EditIntervention;
