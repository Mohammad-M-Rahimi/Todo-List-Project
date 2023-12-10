// TagModal.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import Tags from "../Home/Tag";
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
  const handleAddTag2 = () => {
    if (tagInput.trim() === "") {
      // Prevent adding empty tags
      return;
    }

    // Assuming you want to add the new tag to the state
    handleAddTagWrapper(tagInput, selectedColor);

    // Save tags to local storage
    const updatedTags = [...tags, { tag: tagInput, color: selectedColor }];
    localStorage.setItem("tags", JSON.stringify(updatedTags));

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

        <TextField
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          sx={{ width: "100%" }}
        />
        <Tags
          tags={tags}
          handleDeleteTag={handleDeleteTagWrapper}
          tagBackgroundColor={selectedColor}
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
