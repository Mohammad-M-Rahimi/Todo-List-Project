import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const tagsList = ["Gym", "Study", "Buy", "Visit", "Write", "Work"];

function TagSelector({ selectedTag, onTagSelect, onNewTagAdd }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleTagSelect = (tag) => {
    onTagSelect(tag);
    handleClose();
  };

  const handleNewTagAdd = () => {
    onNewTagAdd();
    handleClose();
  };

  return (
    <div>
      <IconButton size="small" onClick={handleClick} color="primary">
        <AddIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {tagsList.map((tag) => (
          <MenuItem key={tag} onClick={() => handleTagSelect(tag)}>
            {tag}
          </MenuItem>
        ))}
        <MenuItem onClick={handleNewTagAdd}>
          <AddIcon /> Add New Tag
        </MenuItem>
      </Menu>
    </div>
  );
}

export default TagSelector;
