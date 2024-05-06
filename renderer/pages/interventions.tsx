import React from "react";
import Head from "next/head";
import { styled } from "@mui/material";
import Interventions from "../components/form/interventions";

/**
 * Root component for the Alarm page.
 */
const Root = styled("div")(({ theme }) => {
  return {
    textAlign: "center",
    paddingTop: theme.spacing(4),
  };
});

/**
 * Renders the AlarmPage component.
 * @returns The rendered AlarmPage component.
 */
export default function AlarmPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Liste des types d'interventions</title>
      </Head>
      <Root>
        <Interventions />
      </Root>
    </React.Fragment>
  );
}
