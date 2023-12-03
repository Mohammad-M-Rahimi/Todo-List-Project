// Use Reducer for handlers
// Make the code more readable

import { useState, useEffect} from "react";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Container,
  Grid,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Toolbar,
  Typography,
  FormControl,
  Input,
} from "@mui/material";
import theme from "../theme/theme";
import AppBarComponent from "../components/Home/Appbar";
import Tags from "../components/Home/Tags";
import Logic from "../components/Home/Logic";
import crypto from "crypto";

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

const Theme = theme;

export default function Home() {

  const newCategory = "";
  
  const [open, setOpen] = useState(true);
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);
  const [tags, setTags] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [dialogKey, setDialogKey] = useState(0);

  useEffect(() => {
    const storedTags = JSON.parse(localStorage.getItem("tags"));
    if (storedTags) setTags(storedTags);
  }, []);

  const handleDeleteTag = (tagToDelete) => {
    const updatedTags = tags.filter((tag) => tag.tag !== tagToDelete);
    setTags(updatedTags);
    localStorage.setItem("tags", JSON.stringify(updatedTags));
  };

  const toggleDrawer = () => setOpen(!open);

  const handleAddCategory = () => setDialogOpen(true);
  const handleAddTag = () => {
    if (tagInput.trim() === "") return;

    // Create a copy of the existing tags and add the new tag
    const updatedTags = [...tags, { tag: tagInput, color: selectedColor }];

    // Update the state and store in local storage
    setTags(updatedTags);
    localStorage.setItem("tags", JSON.stringify(updatedTags));

    // Clear the input and close the dialog
    setTagInput("");
    setDialogOpen(false);
    setDialogKey((prevKey) => prevKey + 1);
  };

  const handsubmit = (e) => {
    e.preventDefault();
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), title: newItem, completed: false },
    ]);
    setNewItem("");
  };

  const toggleTodo = (id, completed) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed } : todo
      )
    );
  };

  const deleteTodo = (id) =>
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <ThemeProvider theme={Theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBarComponent
          open={open}
          toggleDrawer={toggleDrawer}
          handleLogout={handleLogout}
        />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            display: "flex",
            paddingTop: "60px",
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "auto",
                    width: "970px",
                    maxWidth: "100%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    boxSizing: "border-box",
                    "@media (max-width: 760px)": {
                      width: "100%",
                    },
                  }}
                >
                  <Logic
                    todos={todos}
                    newItem={newItem}
                    setnewItem={setNewItem}
                    setTodos={setTodos}
                    handsubmit={handsubmit}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "auto",
                    minHeight: "228px",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={handleAddCategory}
                    sx={{
                      mb: 1,
                      width: "260px",
                      backgroundColor: "#E25E3E",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#C63D2F",
                      },
                      "&:active": {
                        backgroundColor: "#C63D2F",
                      },
                    }}
                  >
                    + New Category
                  </Button>
                  {newCategory && (
                    <Typography variant="caption" color="textSecondary">
                      Added: {newCategory}
                    </Typography>
                  )}
                  <Tags tags={tags} handleDeleteTag={handleDeleteTag} />
                </Paper>
              </Grid>
              <Grid item xs={12} />
            </Grid>
          </Container>
        </Box>
      </Box>
      <Dialog
        key={dialogKey}
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setDialogKey((prevKey) => prevKey + 1);
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
          <Tags
            tags={tags}
            handleDeleteTag={handleDeleteTag}
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
    </ThemeProvider>
  );
}
