import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { pages } from "../../site";
import Data from "../data";
import { useUpdate } from "../providers/update";
import { testAuth } from "../../hooks/auth";
import Disconnect from "../disconnect";

/**
 *  A navigation bar for the application
 * @returns  A navigation bar for the application
 */
const AppNavBar = () => {
  const { updateMessage } = useUpdate();
  const [mobileOpen, setMobileOpen] = useState(false);

  /**
   * Handles the opening and closing of the drawer
   */
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const {  status } = testAuth();
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        {pages.map((page) => {
          if (page.role == "authenticated" && status != "authenticated") return null;
          return (

            <ListItem key={page.href} disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={() => {
                  window.location.href = page.href;
                }}
              >
                <ListItemText primary={page.name} />
              </ListItemButton>
            </ListItem>
          )
        })}
        <Disconnect />
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="sticky"
        sx={{
          WebkitAppRegion: "drag",
          WebkitUserSelect: "none",
          cursor: "default",
        }}
      >
        <Container maxWidth="xl" sx={{ overflow: "hidden", width: "100%" }}>
          <Toolbar disableGutters sx={{ width: "100%", overflow: "hidden" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                mr: 2,
                display: { sm: "none" },
                WebkitAppRegion: "no-drag",
              }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "flex" },
                overflowX: "auto",
                whiteSpace: "nowrap",
                "&::-webkit-scrollbar": {
                  height: "4px",
                },
              }}
            >
              <Disconnect />
              {pages.map((page) => {
                if (page.role == "authenticated" && status != "authenticated") return null;
                return (
                  <Button
                    key={page.href}
                    onClick={() => {
                      window.location.href = page.href;
                    }}
                    sx={{
                      minWidth: 120,
                      maxWidth: 250,
                      my: 2,
                      mx: 0.5,
                      color: "white",
                      display: "block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      WebkitAppRegion: "no-drag",
                    }}
                  >
                    {page.name}
                  </Button>
                )
              })}
              <Data />
              
              {updateMessage && (
                <Typography
                  sx={{
                    mt: 4,
                    ml: 2,
                    color: "secondary.main",
                    whiteSpace: "nowrap",
                  }}
                >
                  {updateMessage}
                </Typography>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default AppNavBar;
