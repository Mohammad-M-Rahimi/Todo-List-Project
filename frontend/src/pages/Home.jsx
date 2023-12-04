import { useState, useEffect } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Container,
  Grid,
  Paper,
  Button,
  Toolbar,
  Typography,
} from '@mui/material';
import theme from '../theme/theme';
import AppBarComponent from '../components/Home/Appbar';
import Tag from '../components/Home/Tag';
import Logic from '../components/Home/Logic';
import TagModal from '../components/Home/TagModal';
import {
  handleDeleteTag,
  toggleTodo,
  deleteTodo,
  handleLogout,
  handsubmit,
  handleAddTag,
} from '../service/Handler';

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
  const [newCategory, setNewCategory] = useState(""); // Add this line

  const toggleDrawer = () => setOpen(!open);
  const handleAddCategory = () => setDialogOpen(true);

  // Inside your Home component
  useEffect(() => {
    // Check if tags are already present in state
    if (tags.length === 0) {
      const storedTags = JSON.parse(localStorage.getItem("tags"));
      if (storedTags) {
        setTags(storedTags);
      }
    }
  }, [tags]);

  const handleDeleteTagWrapper = (tagToDelete) =>
    handleDeleteTag(tags, setTags, tagToDelete);

  const toggleTodoWrapper = (id) => toggleTodo(id, setTodos, todos);

  const deleteTodoWrapper = (id) => deleteTodo(id, setTodos, todos);

  const handsubmitWrapper = (e) => handsubmit(e, setTodos, setNewItem, newItem);

  const handleAddTagWrapper = () => {
    handleAddTag(
      tagInput,
      selectedColor,
      setTagInput,
      setDialogOpen,
      setTags,
      tags,
      setDialogKey
    );
    // Assuming you want to set newCategory when adding a tag
    setNewCategory(tagInput);
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

                  <Tags tags={tags} handleDeleteTag={handleDeleteTagWrapper} />
                </Paper>
              </Grid>
              <Grid item xs={12} />
            </Grid>
          </Container>
        </Box>
      </Box>
      <TagModal
        dialogKey={dialogKey}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        tagInput={tagInput}
        setTagInput={setTagInput}
        tags={tags}
        handleDeleteTagWrapper={handleDeleteTagWrapper}
        handleAddTagWrapper={handleAddTagWrapper}
      />
    </ThemeProvider>
  );
}
