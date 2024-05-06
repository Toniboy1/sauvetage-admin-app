"use client"
import { useRouter } from 'next/router'
import React, { use, useEffect } from "react";
import Head from "next/head";
import { styled } from "@mui/material";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import { IInterventionFormData } from '../../components/reports/intervention/types';
import db from '../../model/db';
import InterventionForm from '../../components/reports/intervention/form';
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
const EditIntervention =()=> {
    const router = useRouter()
    const { id } = router.query
    const formId = parseInt(id as string)
  const methods = useForm<IInterventionFormData>()
  const onSubmit: SubmitHandler<IInterventionFormData> = async (data) => {
    await db.updateFormIntervention(formId,data);
  }
  useEffect(() => {
    if (id) {
        db.getFormIntervention(formId).then((form) => {
            methods.reset(form)
        }).catch((error) => {
            console.error(error)
        })
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
          {methods.formState.errors && JSON.stringify(methods.formState.errors)}
            <InterventionForm />
          </form>
        </FormProvider>
      </Root>
    </React.Fragment>
  );
}
export default EditIntervention