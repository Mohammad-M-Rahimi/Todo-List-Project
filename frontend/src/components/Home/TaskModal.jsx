import React, { useRef } from "react";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "./style/ModalStyle.css";

const TaskModal = ({
  showInput,
  handleAddOrEdit,
  handleTagChange,
  tags,
  selectedTag,
  newItem,
  setnewItem,
  setShowInput,
  editingId,
  setEditingId,
  setTags, // Pass the setTags function
  styles,
}) => {
  const dialogRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target)) {
      setShowInput(false);
      setEditingId(null);
    }
  };

  const handleButtonClick = () => {
    handleAddOrEdit();
  };

  return (
    <div>
      {showInput && (
        <div
          ref={dialogRef}
          onClick={handleClickOutside}
          className="popup-overlay" // Add the overlay class
        >
          <div
            className="popup-content" // Add the content class
          >
            <DialogTitle>
              {editingId !== null ? "Edit Todo" : "Add Todo"}
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="newitem"
                label="Task"
                type="text"
                fullWidth
                value={newItem}
                onChange={(e) => setnewItem(e.target.value)}
              />

              <FormControl fullWidth style={{ marginTop: "10px" }}>
                <InputLabel id="tag-label"></InputLabel>
                <Select
  labelId="tag-label"
  id="tag"
  value={selectedTag}
  onChange={handleTagChange}
  onClose={(event) => event.stopPropagation()}
>
  {tags.map((tag) => (
    <MenuItem key={tag} value={tag}>
      <div
        style={{
          width: "10px",
          height: "10px",
          marginRight: "5px",
          display: "inline-block",
          backgroundColor: tag.color || "#000", // Add this line for the colored box
        }}
      ></div>
      {tag.tag}
    </MenuItem>
  ))}
</Select>

              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleButtonClick} color="primary">
                {editingId !== null ? "Save Changes" : "Add Todo"}
              </Button>
              <Button
                onClick={() => {
                  setShowInput(false);
                  setEditingId(null);
                }}
                color="secondary"
              >
                Cancel
              </Button>
            </DialogActions>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskModal;
