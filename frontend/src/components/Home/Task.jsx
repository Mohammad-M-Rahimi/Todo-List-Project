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

import "../Home/style/TaskStyle.css";

const Theme = theme;

const Task = () => {
  const [todos, setTodos] = useState(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    return storedTodos;
  });

  const [newItem, setNewItem] = useState("");
  const [selectedTag, setSelectedTag] = useState("Work");
  const [editingId, setEditingId] = useState(null);
  const [showInput, setShowInput] = useState(false);

  // Initialize tags state using the value from local storage or the default value
  const [tags, setTags] = useState(() => {
    const storedTags = JSON.parse(localStorage.getItem("tags"));
    return storedTags || []; // Updated to check if storedTags is falsy (undefined or null)
  });

  useEffect(() => {
    // Load tags from local storage on component mount
    const storedTags = JSON.parse(localStorage.getItem("tags")) || [];
    console.log("Loaded tags from local storage:", storedTags);
    setTags(storedTags);
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  useEffect(() => {
    // Save updated tags to local storage whenever tags change
    localStorage.setItem("tags", JSON.stringify(tags));
  }, [tags]);


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
          handleAddOrEdit={() =>
            handleAddOrEdit(
              newItem,
              editingId,
              todos,
              setTodos,
              setEditingId,
              setNewItem,
              setShowInput,
              selectedTag
            )
          }
          handleTagChange={(e) =>
            handleTagChange(e, tags, setTags, setSelectedTag)
          }
          tags={tags}
          selectedTag={selectedTag}
          newItem={newItem}
          setnewItem={setNewItem}
          setShowInput={setShowInput}
          editingId={editingId}
          setEditingId={setEditingId}
        />
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item${todo.completed ? " completed" : ""}`}
            >
              <div className="container">
                <Checkbox
                  className="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id, todos, setTodos)}
                />
                <div>
                  <Typography variant="body1">{todo.title}</Typography>
                  <Typography variant="caption">{todo.tag}</Typography>
                </div>
                <div className="actions-container">
                  <div className="actions">
                    <IconButton
                      onClick={() =>
                        handleEdit(
                          todo.id,
                          todos,
                          setNewItem,
                          setSelectedTag,
                          setEditingId,
                          setShowInput
                        )
                      }
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteTodo(todo.id, todos, setTodos)}
                      color="secondary"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
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
