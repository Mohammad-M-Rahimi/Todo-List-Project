import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Button,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const predefinedColors = [
  "red",
  "blue",
  "lightblue",
  "yellow",
  "orange",
  "green",
  "purple",
  "pink",
  "black",
];

function Popup({
  showInput,
  handleAddOrEdit,
  handleTagChange,
  tags,
  tagColors,
  selectedTag,
  newitem,
  setNewItem,
  setShowInput,
  editingId,
  handleDeleteTag,
}) {
  const [selectedColor, setSelectedColor] = useState(
    tagColors[selectedTag] || predefinedColors[0]
  );

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  return (
    showInput && (
      <div className="popup">
        <div
          className="popup-content"
          style={{
            padding: 16,
            borderRadius: 4,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <form onSubmit={handleAddOrEdit}>
            <Box>
              <Typography
                variant="h5"
                style={{ textAlign: "center", marginBottom: 16 }}
              >
                Add Your Task
              </Typography>
              <TextField
                variant="outlined"
                value={newitem}
                onChange={(e) => setNewItem(e.target.value)}
                fullWidth
                style={{ marginBottom: 5 }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "5px",
                }}
              >
                <Select
                  renderValue={(selected) => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          backgroundColor: selectedColor, // Use selectedColor here
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          marginRight: 10,
                        }}
                      />
                      <span>{selected}</span>
                    </div>
                  )}
                  value={selectedTag}
                  onChange={handleTagChange}
                  fullWidth
                  variant="outlined"
                  style={{ flex: 1, marginBottom: 5 }}
                >
                  {tags.map((tag) => (
                    <MenuItem key={tag} value={tag}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span>{tag}</span>
                      </div>
                      <IconButton
                        onClick={() => handleDeleteTag(tag)}
                        color="secondary"
                        size="small"
                      >
                        <CloseIcon />
                      </IconButton>
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginBottom: 8 }}
              >
                {editingId !== null ? "Save Edit" : "Add"}
              </Button>
              <Button
                onClick={() => setShowInput(false)}
                variant="contained"
                color="secondary"
                fullWidth
              >
                Cancel
              </Button>
            </Box>
          </form>
        </div>
      </div>
    )
  );
}

export default Popup;
