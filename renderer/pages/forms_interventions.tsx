import React from "react";
import Head from "next/head";
import { styled } from "@mui/material";
import People from "../components/form/people";
import FormInterventionsComponent from "../components/form/interventionsform";

/**
 * Root component for the People page.
 */
const Root = styled("div")(({ theme }) => {
  return {
    textAlign: "center",
    paddingTop: theme.spacing(4),
  };
});

/**
 * Renders the PeoplePage component.
 * @returns The rendered PeoplePage component.
 */
export default function PeoplePage() {
  return (
    <React.Fragment>
      <Head>
        <title>Liste des rapoorts d'interventions</title>
      </Head>
      <Root>
        <FormInterventionsComponent />
      </Root>
    </React.Fragment>
  );
}
