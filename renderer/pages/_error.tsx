import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import React from "react";
import Link from "../components/Link";
import { path } from "../site";

/**
 * Root component for the error page.
 */
const Root = styled("div")(({ theme }) => {
  return {
    textAlign: "center",
    paddingTop: theme.spacing(4),
  };
});

/**
 * Renders the error page.
 * @returns The JSX element representing the error page.
 */
export default function ErrorPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Error</title>
      </Head>
      <Root>
        <Typography gutterBottom>
          <Link href={path("/intervention")}>Go back to home</Link>
        </Typography>
      </Root>
    </React.Fragment>
  );
}
