import { useState, useEffect } from "react";
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
import theme from '../../theme/theme';
import Popup from "./Popup";
import Notification from "./Notification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Theme = theme;

function TodoList() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);
  const [newItem, setnewItem] = useState("");
  const [selectedTag, setSelectedTag] = useState("Work");
  const [editingId, setEditingId] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [tags, setTags] = useState(["Work", "Gym", "Study"]);

  useEffect(
    () => localStorage.setItem("todos", JSON.stringify(todos)),
    [todos]
  );

  const handleTagChange = (e) => setSelectedTag(e.target.value);

  const handleAddOrEdit = () => {
    if (!newItem.trim() || newItem.length > 30) return;

    const updatedTodos =
      editingId !== null
        ? todos.map((todo) =>
            todo.id === editingId
              ? { ...todo, title: newItem, tag: selectedTag }
              : todo
          )
        : [
            ...todos,
            {
              id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
              title: newItem,
              completed: false,
              tag: selectedTag,
            },
          ];

    setTodos(updatedTodos);
    setEditingId(null);
    setnewItem("");
    setShowInput(false);
  };

  const handleEdit = (id) => {
    const taskToEdit = todos.find((todo) => todo.id === id);
    if (taskToEdit) {
      setnewItem(taskToEdit.title);
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

  const showNotification = (message) => {
    // Implement your notification logic here
    alert(message);
  };

  return (
    <ThemeProvider theme={Theme}>
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
          selectedTag={selectedTag}
          newItem={newItem}
          setnewItem={setnewItem}
          setShowInput={setShowInput}
          editingId={editingId}
          setEditingId={setEditingId}
          setNewCategory={setNewCategory}
          handleDeleteTag={handleDeleteTag}
          showNotification={showNotification}
        />
        <Notification />
        <ToastContainer />
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item${todo.completed ? " completed" : ""}`}
              title={todo.title.length > 40 ? todo.title : null}
              style={{
                marginBottom: "10px",
                width: "100%",
                maxWidth: "760px",
                marginLeft: "auto",
                marginRight: "auto",
                boxSizing: "border-box",
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
                    <Typography variant="caption">{todo.tag}</Typography>
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
                      right: "50px",
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
