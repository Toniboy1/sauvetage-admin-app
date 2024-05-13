import { styled } from "@mui/material";
import Head from "next/head";
import React from "react";
import LakeStates from "../components/form/lakeState";

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
        <title>Agitations du lac</title>
      </Head>
      <Root>
        <LakeStates />
      </Root>
    </React.Fragment>
  );
}
