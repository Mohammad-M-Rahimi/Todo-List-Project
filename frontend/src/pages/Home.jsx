  // Home.jsx
  import React, { useState, useEffect } from "react";
  import {
    ThemeProvider,
    CssBaseline,
    Box,
    Container,
    Grid,
    Paper,
    Button,
    Toolbar,
  } from "@mui/material";
  import theme from "../theme/theme";
  import AppBarComponent from "../components/Home/Appbar";
  import Tag from "../components/Home/Category";
  import Logic from "../components/Home/Task";
  import CategoryModal from "../components/Home/CategoryModal";

  const Theme = theme;

  export default function Home() {
    const [open, setOpen] = useState(true);
    const [newItem, setNewItem] = useState("");
    const [todos, setTodos] = useState([]);
    const [tags, setTags] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [dialogKey, setDialogKey] = useState(0);
    const [selectedTag, setSelectedTag] = useState("");

    const toggleDrawer = () => setOpen(!open);
    const handleAddCategory = () => setDialogOpen(true);

    const handleDeleteTagWrapper = (tagToDelete) => {
      const updatedTags = tags.filter((tag) => tag.tag !== tagToDelete.tag);
      setTags(updatedTags);

      // Assuming you have a function to filter todos based on the tag
      const updatedTodos = todos.filter((todo) => todo.tag !== tagToDelete.tag);
      setTodos(updatedTodos);

      // Save updated tags to local storage
      localStorage.setItem("tags", JSON.stringify(updatedTags));

      // Update selectedTag if needed
      if (selectedTag === tagToDelete.tag) {
        setSelectedTag(""); // You may want to set it to some default value
      }
    };

    const toggleTodoWrapper = (id) => {
      setTodos((currentTodos) =>
        currentTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    };

    const deleteTodoWrapper = (id) => {
      setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
    };

    const handsubmitWrapper = (e) => {
      e.preventDefault();
      setTodos((currentTodos) => [
        ...currentTodos,
        { id: todos.length + 1, title: newItem, completed: false },
      ]);
      setNewItem("");
    };

    const handleAddTagWrapper = (tag, color) => {
      // Update validation to provide more details
      if (tag.trim() === "") {
        console.log("Tag input is empty.");
        return;
      }

      // Check if color is provided and is a valid hex color code
      const colorRegex = /^#[0-9A-Fa-f]{6}$/;
      if (color === undefined || (color && colorRegex.test(color))) {
        console.log("Adding tag:", { tag, color });

        const updatedTags = [...tags, { tag, color }];
        console.log("Updated tags:", updatedTags);

        setTags(updatedTags);

        setDialogOpen(false);
        setDialogKey((prevKey) => prevKey + 1);

        // Save updated tags to local storage
        localStorage.setItem("tags", JSON.stringify(updatedTags));
      } else {
        console.log(
          "Invalid color format. Please use a valid hex color code. Received:",
          color
        );
      }
    };

    useEffect(() => {
      // Save updated tags to local storage whenever tags change
      localStorage.setItem("tags", JSON.stringify(tags));
    }, [tags]);
    

    return (
      <ThemeProvider theme={Theme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBarComponent open={open} toggleDrawer={toggleDrawer} />
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
                    }}
                  >
                    <Logic
                      todos={todos}
                      newItem={newItem}
                      setnewItem={setNewItem}
                      setTodos={setTodos}
                      handsubmit={handsubmitWrapper}
                      toggleTodo={toggleTodoWrapper}
                      deleteTodo={deleteTodoWrapper}
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

                    <Tag
                      tags={tags}
                      handleDeleteTag={handleDeleteTagWrapper}
                      setSelectedTag={setSelectedTag}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} />
              </Grid>
            </Container>
          </Box>
        </Box>
        <CategoryModal
          dialogKey={dialogKey}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          tags={tags}
          setTags={setTags} // Make sure setTags is passed correctly
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
      </ThemeProvider>
    );
  }
