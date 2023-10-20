import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Container,
  CssBaseline,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../components/Sidebar";
import TagSelector from "../components/Tagselector";
import TaskFilter from "../components/Filter";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#E25E3E",
    },
    secondary: {
      main: "#FF9B50",
    },
    background: {
      default: "#ffff",
    },
    text: {
      primary: "#C63D2F",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  shape: {
    borderRadius: 18,
  },
});

const styles = {
  container: {
    marginTop: theme.spacing(4),
  },
  taskContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
  },
  taskContent: {
    display: "flex",
    alignItems: "center",
  },
  taskLabel: {
    textDecoration: "none",
    marginRight: theme.spacing(1),
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
  },
  actionButton: {
    marginLeft: theme.spacing(1.5),
  },
  centeredInput: {
    display: "flex",
    alignItems: "center",
  },
  taskWrapper: {
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
};

export default function Home() {
  const [newItem, setNewItem] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [todos, setTodos] = useState(() => {
    const localvalue = localStorage.getItem("ITEMS");
    if (localvalue == null) return [];
    return JSON.parse(localvalue);
  });
  const [editItemId, setEditItemId] = useState(null);

  const [showDone, setShowDone] = useState(true);
  const [showUndone, setShowUndone] = useState(true);

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!selectedTag) {
      return;
    }

    if (editItemId !== null) {
      setTodos((currentTodos) => {
        return currentTodos.map((todo) => {
          if (todo.id === editItemId) {
            return { ...todo, title: newItem, tag: selectedTag };
          }
          return todo;
        });
      });
      setEditItemId(null);
    } else {
      setTodos((currentTodos) => [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false, tag: selectedTag },
      ]);
    }

    setNewItem("");
    setSelectedTag("");
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  function editTodo(id) {
    setEditItemId(id);
    const taskToEdit = todos.find((todo) => todo.id === id);
    setNewItem(taskToEdit.title);
    setSelectedTag(taskToEdit.tag || "");
  }

  const filteredTasks = todos.filter((task) => {
    if (showDone && showUndone) {
      return true;
    } else if (showDone && task.completed) {
      return true;
    } else if (showUndone && !task.completed) {
      return true;
    }
    return false;
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" style={styles.container}>
        <Sidebar />
        <form onSubmit={handleSubmit}>
          <div style={styles.centeredInput}>
            <TextField
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              type="text"
              id="item"
              fullWidth
              placeholder="New Item"
            />
          </div>
          <TagSelector
            selectedTag={selectedTag}
            onTagSelect={setSelectedTag}
            onNewTagAdd={() => {
              // Implement adding a new tag here
            }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ width: "100%", marginTop: theme.spacing(2) }}
          >
            {editItemId !== null ? "Save" : "Add"}
          </Button>
        </form>
        <Typography variant="h4">Taskify</Typography>
        <TaskFilter
          showDone={showDone}
          showUndone={showUndone}
          onToggleShowDone={() => setShowDone(!showDone)}
          onToggleShowUndone={() => setShowUndone(!showUndone)}
        />
        <ul>
          {filteredTasks.map((todo) => (
            <div key={todo.id} style={styles.taskWrapper}>
              <li style={styles.taskContainer}>
                <div style={styles.taskContent}>
                  <label style={styles.taskLabel}>
                    <Checkbox
                      checked={todo.completed}
                      onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                    />
                  </label>
                  <Typography
                    variant="body1"
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                      color: todo.completed ? "#888" : "inherit",
                    }}
                  >
                    {todo.tag && (
                      <span>
                        <span style={{ opacity: 0.95 }}>{todo.tag}</span>
                        {" - "}
                      </span>
                    )}
                    {todo.tag && (
                      <span style={{ fontWeight: "bold" }}>{todo.title}</span>
                    )}
                    {!todo.tag && <span>{todo.title}</span>}
                  </Typography>
                </div>
                <div style={styles.buttonContainer}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteTodo(todo.id)}
                    style={styles.actionButton}
                  >
                    DELETE
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => editTodo(todo.id)}
                    style={styles.actionButton}
                  >
                    EDIT
                  </Button>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </Container>
    </ThemeProvider>
  );
}
