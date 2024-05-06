import React from "react";
import Head from "next/head";
import { styled } from "@mui/material";
import Severities from "../components/form/severity";

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
        <title>Sauveteurs</title>
      </Head>
      <Root>
        <Severities />
      </Root>
    </React.Fragment>
  );
}
