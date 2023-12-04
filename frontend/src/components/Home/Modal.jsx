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
import styles from "./style/ModalStyle"; // Updated import

const Modal = ({
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
  setNewCategory,
  handleDeleteTag,
  styles, // Updated prop
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
          style={styles.modal} // Use the overlay style
        >
          <div
            className="popup-content"
            style={styles.modalContent} // Use the content style
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
                value={newItem} // Corrected variable name
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
                        }}
                      ></div>
                      {tag}
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

export default Modal;
