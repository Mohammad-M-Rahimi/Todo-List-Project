// TagModal.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import Tags from "./Category";
import { ChromePicker } from "react-color";

const CategoryModal = ({
  dialogKey,
  dialogOpen,
  setDialogOpen,
  tags,
  setTags,
  setSelectedTag,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const defaultColor = "#000000";
  const [tagInput, setTagInput] = useState("");
  const [selectedColor, setSelectedColor] = useState(defaultColor);

  const handleAddTag = () => {
    if (tagInput.trim() === "") {
      return;
    }

    // Update tags if a new tag is added
    if (!tags.some((t) => t.tag === tagInput)) {
      setTags((prevTags) => [
        ...prevTags,
        { tag: tagInput, color: selectedColor },
      ]);
    }

    // Select the newly added tag
    setSelectedTag(tagInput);

    // Close the dialog and clear the input
    setDialogOpen(false);
    setTagInput("");
  };

  const handleChangeColor = (color) => {
    setSelectedColor(color.hex);
    setShowColorPicker(false);
  };

  return (
    <Dialog
      key={dialogKey}
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
    >
      <DialogTitle>Write it Down</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ paddingBottom: "10px" }}>
          Add/delete tags
        </DialogContentText>

        <TextField
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          sx={{ width: "100%" }}
        />

        <Box mt={2}>
          <Button
            onClick={() => setShowColorPicker((prev) => !prev)}
            sx={{
              backgroundColor: selectedColor,
              width: "100%",
              padding: "5px",
              borderRadius: "4px",
            }}
          >
            {showColorPicker && (
              <ChromePicker
                color={selectedColor}
                onChange={handleChangeColor}
              />
            )}
          </Button>
        </Box>

        <Tags tags={tags} setSelectedTag={setSelectedTag} />
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

export default CategoryModal;
