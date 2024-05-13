import { styled } from "@mui/material";
import Head from "next/head";
import React from "react";
import People from "../components/form/people";

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
        <People />
      </Root>
    </React.Fragment>
  );
}
