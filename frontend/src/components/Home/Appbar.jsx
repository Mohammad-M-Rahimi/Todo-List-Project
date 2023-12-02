import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/ExitToApp";

export default function AppBarComponent({ open, toggleDrawer, handleLogout }) {
  return (
    <AppBar position="absolute">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flex: 1 }}>
          Dashboard
        </Typography>
        <Tooltip title="Notifications" arrow>
          <IconButton color="inherit">
            <Badge color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Settings" arrow>
          <IconButton color="inherit">
            <Badge color="secondary">
              <SettingsIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Logout" arrow>
          <IconButton color="inherit" onClick={handleLogout}>
            <Badge color="secondary">
              <LogoutIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
