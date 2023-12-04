// TagDialog.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  FormControl,
  Input,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

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

const TagDialog = ({
  dialogKey,
  dialogOpen,
  setDialogOpen,
  selectedColor,
  setSelectedColor,
  tagInput,
  setTagInput,
  handleDeleteTagWrapper,
  handleAddTagWrapper,
}) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Set an initial color when the component mounts
    if (!initialized) {
      setSelectedColor(predefinedColors[0] || "#000000"); // Use hex code for black
      setInitialized(true);
    }
  }, [initialized, setSelectedColor]);

  const handleAddTag = () => {
    if (tagInput.trim() === "") {
      // Prevent adding empty tags
      return;
    }

    // Assuming you want to add the new tag to the state
    handleAddTagWrapper(tagInput, selectedColor);

    // Close the dialog and clear the input
    setDialogOpen(false);
    setTagInput("");
  };

  return (
    <Dialog
      key={dialogKey}
      open={dialogOpen}
      onClose={() => {
        setDialogOpen(false);
      }}
    >
      <DialogTitle>Write it Down</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ paddingBottom: "10px" }}>
          Add/delete tags
        </DialogContentText>
        <FormControl fullWidth style={{ marginBottom: 5 }}>
          <Input
            id="color-picker"
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            inputProps={{ list: "predefinedColors" }}
            style={{ width: "55px" }}
          />
          <datalist id="predefinedColors">
            {predefinedColors.map(
              (color) =>
                color.toLowerCase() !== "white" && (
                  <option key={color} value={color} />
                )
            )}
          </datalist>
        </FormControl>

        <TextField
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          sx={{ width: "100%" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddTag} color="primary">
          Add Tag
        </Button>
        <Button onClick={() => setDialogOpen(false)} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TagDialog;
