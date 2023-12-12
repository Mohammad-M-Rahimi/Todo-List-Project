import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Typography,
  Button,
  Checkbox,
  IconButton,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import theme from "../../theme/theme";
import Modal from "./TaskModal";
import {
  handleTagChange,
  handleAddOrEdit,
  handleEdit,
  handleToggleTodo,
  deleteTodo,
} from "../../service/Handler"; // Import the functions from Handler.js

const Theme = theme;

const Task = () => {
  const [todos, setTodos] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [selectedTag, setSelectedTag] = useState("Work");
  const [editingId, setEditingId] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [tags, setTags] = useState(["Work", "Gym", "Study"]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const styles = {
    todoItem: {
      marginBottom: "10px",
      width: "100%",
      maxWidth: "760px",
      marginLeft: "auto",
      marginRight: "auto",
      boxSizing: "border-box",
    },
    completedTodoItem: {
      background: "#ddd",
    },
  };

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Box>
        <Button
          onClick={() => setShowInput(!showInput)}
          variant="contained"
          color="primary"
        >
          {showInput ? "Cancel" : "Add"}
        </Button>
        <Modal
          showInput={showInput}
          handleAddOrEdit={() => handleAddOrEdit(newItem, editingId, todos, setTodos, setEditingId, setNewItem, setShowInput, selectedTag)}
          handleTagChange={(e) => handleTagChange(e, tags, setTags, setSelectedTag)}
          tags={tags}
          selectedTag={selectedTag}
          newItem={newItem}
          setnewItem={setNewItem}
          setShowInput={setShowInput}
          editingId={editingId}
          setEditingId={setEditingId}
          styles={styles}
        />
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item${todo.completed ? " completed" : ""}`}
              style={{
                ...styles.todoItem,
                ...(todo.completed ? styles.completedTodoItem : {}),
              }}
            >
              <div>
                <Checkbox
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id, todos, setTodos)}
                />
                <div>
                  <Typography variant="body1">{todo.title}</Typography>
                  <Typography variant="caption">{todo.tag}</Typography>
                </div>
                <div>
                  <IconButton onClick={() => handleEdit(todo.id, todos, setNewItem, setSelectedTag, setEditingId, setShowInput)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteTodo(todo.id, todos, setTodos)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Box>
    </ThemeProvider>
  );
};

export default Task;
