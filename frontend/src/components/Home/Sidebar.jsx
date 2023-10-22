// Sidebar.js
import React, { useState } from "react";
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button key="Home">
            <ListItemIcon>{/* Add your icon here */}</ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          {/* Add more items as needed */}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
