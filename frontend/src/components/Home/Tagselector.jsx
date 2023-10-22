import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const tagsList = ["Gym", "Study", "Buy", "Visit", "Write", "Work"];

const TagSelector = ({ selectedTag, onTagSelect, onNewTagAdd }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
      <IconButton
        size="small"
        aria-controls="tag-selector"
        aria-haspopup="true"
        onClick={handleClick}
        color="primary"
      >
        <AddIcon />
      </IconButton>
      <Menu
        id="tag-selector"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {tagsList.map((tag) => (
          <MenuItem key={tag} onClick={() => handleTagSelect(tag)}>
            {tag}
          </MenuItem>
        ))}
        <MenuItem onClick={handleNewTagAdd}></MenuItem>
      </Menu>
    </div>
  );
};

export default TagSelector;
