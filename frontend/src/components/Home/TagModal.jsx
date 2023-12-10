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
import Tags from "../Home/Tag";
import { ChromePicker } from "react-color";
import {
  handleDeleteTag,
  handleAddTag,
  isValidColor,
  formatColor,
} from "../../service/Handler";

const TagModal = ({
  dialogKey,
  dialogOpen,
  setDialogOpen,
  selectedColor,
  setSelectedColor,
  tagInput,
  setTagInput,
  tags,
  handleDeleteTagWrapper,
  handleAddTagWrapper,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Set a default visible color (e.g., black)
  const defaultColor = "#000000";

  const handleAddTag2 = () => {
    if (tagInput.trim() === "") {
      // Prevent adding empty tags
      return;
    }

    // Assuming you want to add the new tag to the state
    handleAddTagWrapper(tagInput, selectedColor || defaultColor);

    // Save tags to local storage
    const updatedTags = [...tags, { tag: tagInput, color: selectedColor || defaultColor }];
    localStorage.setItem("tags", JSON.stringify(updatedTags));

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
      onClose={() => {
        setDialogOpen(false);
      }}
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
              backgroundColor: selectedColor || defaultColor,
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

        <Tags
          tags={tags}
          handleDeleteTag={handleDeleteTagWrapper}
          tagBackgroundColor={selectedColor || defaultColor}
          insideDialog={true}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddTag2} color="primary">
          Add Tag
        </Button>
        <Button onClick={() => setDialogOpen(false)} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TagModal;
