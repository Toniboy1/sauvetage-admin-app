import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { AppProps } from "next/app";
import Head from "next/head";
import AppNavBar from "../components/appbar";
import { UpdateProvider } from "../components/providers/update";
import theme from "../lib/theme";
dayjs.extend(utc);
dayjs.extend(timezone);
/**
 * The root component of the application.
 * @param props - The props for the App component.
 * @returns The rendered JSX element.
 */
export default function App(props: AppProps) {
  const { Component, pageProps, } = props;
  return (
    <AppCacheProvider {...props}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <UpdateProvider>
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
