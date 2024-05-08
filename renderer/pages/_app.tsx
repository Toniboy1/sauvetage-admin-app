import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../lib/theme";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AppNavBar from "../components/appbar";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { UpdateProvider } from "../components/providers/update";
import UpdaterComponent from "../components/updater";

dayjs.extend(utc);
dayjs.extend(timezone);
/**
 * The root component of the application.
 * @param props - The props for the App component.
 * @returns The rendered JSX element.
 */
export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <AppCacheProvider {...props}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <UpdateProvider>
        <UpdaterComponent />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppNavBar />
            <Component {...pageProps} />
          </ThemeProvider>
        </LocalizationProvider>
      </UpdateProvider>
    </AppCacheProvider>
  );
}
