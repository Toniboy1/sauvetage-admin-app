import { styled } from "@mui/material";
import Head from "next/head";
import React from "react";
import Alarm from "../components/form/alarm";
import { useAuth } from "../hooks/auth";

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
  const { status } = useAuth();
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
