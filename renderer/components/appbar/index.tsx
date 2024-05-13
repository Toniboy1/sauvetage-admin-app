import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Data from "../data";
import { useUpdate } from "../providers/update";

const pages = [
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
    href: "/other_means",
  },
  {
    name: "Types de causes",
    href: "/causes",
  },
  {
    name: "Actions",
    href: "/actions",
  },
  {
    name: "Lieux communs",
    href: "/common_locations",
  },
  {
    name: "Liste des rapports d'interventions",
    href: "/forms_interventions",
  },
];

const AppNavBar = () => {
  const { updateMessage } = useUpdate();
  console.log(updateMessage);
  return (
    <AppBar position="sticky"sx={{
      '-webkit-app-region': 'drag',
      '-webkit-user-select': 'none',
      cursor: 'default'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
            {updateMessage && (
              <Typography sx={{ mt: 4, mb: 2, color: "secondary.main" }}>
                {updateMessage}
              </Typography>
            )}
            <Data />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default AppNavBar;
