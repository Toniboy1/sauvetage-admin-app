import React from "react";
import Head from "next/head";
import { styled } from "@mui/material";
import Alarm from "../components/form/alarm";

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
        <title>Sauveteurs</title>
      </Head>
      <Root>
        <Alarm />
      </Root>
    </React.Fragment>
  );
}
