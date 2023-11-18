import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Button,
  Popover,
  Typography,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const tagsList = ["Gym", "Study", "Buy", "Visit", "Write", "Work"];

function TagSelector({ selectedTag, onTagSelect, onNewTagAdd }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("#000000"); // Default color
  const [colorPickerAnchor, setColorPickerAnchor] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    setNewTagName(""); // Reset new tag name when closing
    setNewTagColor("#000000"); // Reset new tag color when closing
  };

  const handleTagSelect = (tag) => {
    onTagSelect(tag);
    handleClose();
  };

  const handleNewTagAdd = () => {
    setColorPickerAnchor(anchorEl);
  };

  const handleColorChange = (color) => {
    setNewTagColor(color);
    handleCloseColorPicker();
  };

  const handleCloseColorPicker = () => {
    setColorPickerAnchor(null);
  };

  const openColorPicker = Boolean(colorPickerAnchor);

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
          <TextField
            label="New Tag"
            variant="standard"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    onClick={handleNewTagAdd}
                    variant="contained"
                    color="primary"
                  >
                    <AddIcon /> Add
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </MenuItem>
      </Menu>
      <Popover
        open={openColorPicker}
        anchorEl={colorPickerAnchor}
        onClose={handleCloseColorPicker}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box p={2}>
          <Typography variant="body1" gutterBottom>
            Choose Color for the New Tag
          </Typography>
          <input
            type="color"
            value={newTagColor}
            onChange={(e) => handleColorChange(e.target.value)}
          />
        </Box>
      </Popover>
    </div>
  );
}

export default TagSelector;
