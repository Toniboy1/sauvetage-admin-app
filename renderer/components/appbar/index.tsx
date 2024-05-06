import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";

const pages = [
  {
    name: "Home",
    href: "/home",
  },
  {
    name: "Interventions",
    href: "/intervention",
  },
  {
    name: "Alarmes",
    href: "/alarmes",
  },
  {
    name: "Sauveteurs",
    href: "/people",
  },
  {
    name: "Gravité",
    href: "/severities",
  },
  {
    name: "Types d'interventions",
    href: "/interventions",
  },
  {
    name: "Types de moyens supplémentaires",
    href: "/other_means"
  },
  {
    name: "Types de causes",
    href: "/causes"
  },
  {
    name: "Actions",
    href: "/actions"
  },
  {
    name: "Lieux communs",
    href: "/common_locations"
  }
];

const AppNavBar = () => {

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.href}
                onClick={() => {
                  window.location.href = page.href;
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default AppNavBar;
