import { styled } from "@mui/material";
import Head from "next/head";
import React from "react";
import OtherMeans from "../components/form/otherMeans";

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
        <title>Liste des types de moyens supplémentaire</title>
      </Head>
      <Root>
        <OtherMeans />
      </Root>
    </React.Fragment>
  );
}
