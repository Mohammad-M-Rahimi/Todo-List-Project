import Tag from "./Tag";
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
  const handleAddTag = () => {
    if (tagInput.trim() === "") {
      // Prevent adding empty tags
      return;
    }

    const updatedTags = [...tags, { tag: tagInput, color: selectedColor }];
    // Assuming you want to add the new tag to the state
    handleAddTagWrapper(tagInput, selectedColor);

    // Save tags to local storage
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
        <Tag
          tags={tags}
          handleDeleteTag={handleDeleteTagWrapper}
          tagBackgroundColor={selectedColor}
          insideDialog={true}
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

export default TagModal;
