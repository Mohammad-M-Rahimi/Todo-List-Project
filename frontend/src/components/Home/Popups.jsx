import React from "react";
import { Box, Typography, TextField, Select, MenuItem, IconButton, Button } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

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
  setEditingId,
  setNewCategory,
  handleDeleteTag,
}) {
  return (
    showInput && (
      <div className="popup">
        <div className="popup-content">
          <form onSubmit={handleAddOrEdit}>
            <Box>
              <Typography variant="h6">Add Item</Typography>
              <TextField
                variant="outlined"
                value={newitem}
                onChange={(e) => setNewItem(e.target.value)}
                fullWidth
              />
              <div style={{ display: "flex", alignItems: "center" }}>
                <Select
                  renderValue={(selected) => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          backgroundColor: tagColors[selected],
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
                  style={{ flex: 1 }}
                >
                  {tags.map((tag) => (
                    <MenuItem key={tag} value={tag}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                          style={{
                            backgroundColor: tagColors[tag],
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            marginRight: 10,
                          }}
                        />
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
              >
                {editingId !== null ? "Save Edit" : "Add"}
              </Button>
            </Box>
          </form>
          <Button
            onClick={() => setShowInput(false)}
            variant="contained"
            color="secondary"
            fullWidth
          >
            Cancel
          </Button>
        </div>
      </div>
    )
  );
}

export default Popup;
