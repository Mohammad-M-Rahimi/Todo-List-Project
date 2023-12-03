import { useRef } from "react";
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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Popup = ({
  showInput,
  handleAddOrEdit,
  handleTagChange,
  tags,
  selectedTag,
  newitem,
  setNewItem,
  setShowInput,
  editingId,
  setEditingId
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
    toast.success(`Task "${newitem}" ${editingId !== null ? "Updated" : "Added"}`);
  };

  return (
    <div>
      {showInput && (
        <div
          className="popup"
          onClick={handleClickOutside}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
        >
          <div
            ref={dialogRef}
            className="popup-content"
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "5px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            }}
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
                value={newitem}
                onChange={(e) => setNewItem(e.target.value)}
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
      <ToastContainer />
    </div>
  );
};

export default Popup;
