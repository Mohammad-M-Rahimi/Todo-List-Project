import React, { useState, useEffect } from "react";
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
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import theme from "../theme/theme";
import AppBarComponent from "../components/Home/Appbar";
import Tags from "../components/Home/Tags";
import Logic from "../components/Home/Logic";
import crypto from "crypto"; // Make sure to import the crypto module

const Theme = theme;

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const [newitem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const storedTags = JSON.parse(localStorage.getItem("tags"));
    if (storedTags) {
      setTags(storedTags);
    }
  }, []);

  const handleDeleteTag = (tagToDelete) => {
    const updatedTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(updatedTags);
    localStorage.setItem("tags", JSON.stringify(updatedTags));
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleAddCategory = () => {
    setDialogOpen(true);
  };

  const handleAddTag = () => {
    if (newCategory.trim() === "") return;
    const updatedTags = [...tags, newCategory];
    localStorage.setItem("tags", JSON.stringify(updatedTags));
    setTags(updatedTags);
    setNewCategory("");
    window.location.reload(); // This line is reloading the page, you may consider removing it
  };

  function handsubmit(e) {
    e.preventDefault();           
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), title: newitem, completed: false },
    ]);
    setNewItem("");
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => {
        if (todo.id === id) {
          todo.completed = completed;
          return { ...todo, completed };
        }
        return todo;
      })
    );
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

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
                  }}
                >
                  <Logic
                    todos={todos}
                    newitem={newitem}
                    setNewItem={setNewItem}
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
                        backgroundColor: "#C63D2F", // Change background color on hover
                      },
                      "&:active": {
                        backgroundColor: "#C63D2F", // Change background color when clicked
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
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add/Delete Tag</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new tag or delete existing tags.
          </DialogContentText>
          <TextField
            type="text"
            placeholder="New Tag"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            sx={{ width: "100%" }}
          />
          <Tags tags={tags} handleDeleteTag={handleDeleteTag} />
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
