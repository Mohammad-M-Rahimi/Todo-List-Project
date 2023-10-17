const express = require("express");
const authenticateMiddleware = require('../middlewares/authenticateMiddleware');
const [
  createCategory,
  getCategories,
  getCategory,
  editCategory,
  deleteCategory,
] = require("../controllers/categoryController");

const Router = express.Router();

// POST req
Router.post("/add", authenticateMiddleware, createCategory);

// GET req
Router.get("/", authenticateMiddleware, getCategories);

// GET req
Router.get("/:id", authenticateMiddleware, getCategory);

// PUT req
Router.put("/edit/:id", authenticateMiddleware, editCategory);

// DELETE req
Router.delete("/delete/:id", authenticateMiddleware, deleteCategory);

module.exports = Router;
