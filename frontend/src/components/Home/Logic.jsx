// TodoList.js
import React, { useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

import Popup from "./Popup";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#E25E3E" },
    secondary: { main: "#FF9B50" },
    background: { default: "#ffff" },
    text: { primary: "#C63D2F" },
  },
  typography: { fontFamily: "Roboto, Arial, sans-serif" },
  shape: { borderRadius: 18 },
});

const predefinedColors = [
  "#FF5733",
  "#FFC300",
  "#33FF57",
  "#338CFF",
  "#B633FF",
  "#FF3362",
  "#33FFE6",
  "#8CFF33",
  "#FF33A6",
];

const getRandomColor = () =>
  predefinedColors[Math.floor(Math.random() * predefinedColors.length)];

const initialTags = JSON.parse(localStorage.getItem("tags")) || [
  "Work",
  "Gym",
  "Study",
];
const tagColors = Object.fromEntries(
  initialTags.map((tag, index) => [
    tag,
    predefinedColors[index % predefinedColors.length],
  ])
);

function TodoList() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [newitem, setNewItem] = useState("");
  const [selectedTag, setSelectedTag] = useState(initialTags[0]);
  const [editingId, setEditingId] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [tags, setTags] = useState([...initialTags]);

  useEffect(
    () => localStorage.setItem("todos", JSON.stringify(todos)),
    [todos]
  );

  const handleTagChange = (e) => setSelectedTag(e.target.value);

  const handleAddOrEdit = (e) => {
    e.preventDefault();

    if (!newitem.trim() || newitem.length > 30) return;

    const updatedTodos =
      editingId !== null
        ? todos.map((todo) =>
            todo.id === editingId
              ? { ...todo, title: newitem, tag: selectedTag }
              : todo
          )
        : [
            ...todos,
            {
              id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
              title: newitem,
              completed: false,
              tag: selectedTag,
            },
          ];

    setTodos(updatedTodos);
    setEditingId(null);
    setNewItem("");
    setShowInput(false);
  };

  const handleEdit = (id) => {
    const taskToEdit = todos.find((todo) => todo.id === id);
    if (taskToEdit) {
      setNewItem(taskToEdit.title);
      setSelectedTag(taskToEdit.tag);
      setEditingId(id);
      setShowInput(true);
    }
  };

  const handleToggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTag = (tagToDelete) => {
    const updatedTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(updatedTags);
    setSelectedTag(updatedTags[0]);
    localStorage.setItem("tags", JSON.stringify(updatedTags));
  };

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Button
          onClick={() => setShowInput(!showInput)}
          variant="contained"
          color="primary"
          sx={{
            marginTop: { xs: 2, md: 3 },
            width: { xs: "100%", sm: "50%", md: "40%", lg: "30%", xl: "770px" },
            marginLeft: { xs: 0, md: "3%" },
          }}
        >
          {showInput ? "Cancel" : "Add"}
        </Button>

        <Popup
          showInput={showInput}
          handleAddOrEdit={handleAddOrEdit}
          handleTagChange={handleTagChange}
          tags={tags}
          tagColors={tagColors}
          selectedTag={selectedTag}
          newitem={newitem}
          setNewItem={setNewItem}
          setShowInput={setShowInput}
          editingId={editingId}
          setEditingId={setEditingId}
          setNewCategory={setNewCategory}
          handleDeleteTag={handleDeleteTag}
        />
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item${todo.completed ? " completed" : ""}`}
              title={todo.title.length > 40 ? todo.title : null}
              style={{
                marginBottom: "10px",
                width: "100%", // Set width to 100% by default
                maxWidth: "760px", // Set maximum width to 760px
                marginLeft: "auto", // Align to the right
                marginRight: "auto", // Align to the left
                boxSizing: "border-box", // Include padding and border in the element's total width and height
                background: todo.completed ? "#ddd" : "inherit",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "670px",
                }}
              >
                <Checkbox
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                  style={{ color: todo.completed ? "green" : "inherit" }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body1" style={{ margin: "0" }}>
                      {todo.title}
                    </Typography>
                  </div>
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Typography
                      variant="caption"
                      style={{ color: tagColors[todo.tag] }}
                    >
                      {todo.tag}
                    </Typography>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    left: "70px",
                    "@media (max-width: 760px)": {
                      left: 0,
                      justifyContent: "flex-end",
                      marginTop: "10px",
                      width: "100%",
                      boxSizing: "border-box",
                    },
                  }}
                >
                  <div
                    style={{
                      marginLeft: "auto",
                      display: "flex",
                      gap: "10px",
                      position: "relative",
                      right: "50px", // Adjusted the right property here
                    }}
                  >
                    <IconButton
                      onClick={() => handleEdit(todo.id)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteTodo(todo.id)}
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
      <style>
        {`
          .todo-item {
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 10px;
            display: flex;
            align-items: center;
            height: 70px;
            width: 650px;
          }
          .todo-item.completed {
            text-decoration: line-through;
          }
          .popup {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
          }
          .popup-content {
            background: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
    </ThemeProvider>
  );
}

export default TodoList;
