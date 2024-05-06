import React from "react";
import Head from "next/head";
import { styled } from "@mui/material";
import Causes from "../components/form/causes";

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
        <title>Type de causes</title>
      </Head>
      <Root>
        <Causes />
      </Root>
    </React.Fragment>
  );
}
