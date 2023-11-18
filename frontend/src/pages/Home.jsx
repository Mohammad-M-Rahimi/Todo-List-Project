import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import theme from "../theme/theme";
import Copyright from "../components/common/copyright";
import AppBar from "../components/common/appbar";
import Tooltip from "@mui/material/Tooltip";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import SettingsModal from "../components/Home/SettingsModal";

const Theme = theme;

const HandleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("light");

  const handleThemeModalOpen = () => {
    setIsThemeModalOpen(true);
  };

  const handleThemeModalClose = (theme) => {
    setIsThemeModalOpen(false);
    setSelectedTheme(theme);
  };

  return (
    <ThemeProvider theme={Theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <Tooltip title="Notifications" arrow>
              <IconButton sx={{ marginRight: "15px" }} color="inherit">
                <Badge color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings" arrow>
              <IconButton
                sx={{ marginRight: "15px" }}
                color="inherit"
                onClick={handleThemeModalOpen}
              >
                <Badge color="secondary">
                  <SettingsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <SettingsModal
              open={isThemeModalOpen}
              onClose={handleThemeModalClose}
            />
            <Tooltip title="Logout" arrow>
              <IconButton
                sx={{ marginRight: "15px" }}
                color="inherit"
                onClick={HandleLogout}
              >
                <Badge color="secondary">
                  <LogoutIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Typography>Main Tasks & filters</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Typography>Add Category and show</Typography>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
