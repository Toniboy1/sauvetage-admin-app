import { styled } from "@mui/material";
import Head from "next/head";
import React from "react";
import Weathers from "../components/form/weathers";

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
        <title>Type de weathers</title>
      </Head>
      <Root>
        <Weathers />
      </Root>
    </React.Fragment>
  );
}
