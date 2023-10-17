const express = require("express");
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");
const [
  createTask,
  getTasks,
  getTask,
  editTask,
  deleteTask,
] = require("../controllers/TaskController");

const Router = express.Router();

// POST req
Router.post("/add", authenticateMiddleware, createTask);

// GETALL req
Router.get("/", authenticateMiddleware, getTasks);

// GET req
Router.get("/:id", authenticateMiddleware, getTask);

// PUT req
Router.put("/edit/:id", authenticateMiddleware, editTask);

// DELETE req
Router.delete("/delete/:id", authenticateMiddleware, deleteTask);

module.exports = Router;
