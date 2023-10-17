const Category = require('../models/Category');

const createCategory = async (req, res) => {
    try {
      // Validating the request parameters
      if (!req.body.tag || !req.body.color) {
        return res.status(404).send({ message: "Invalid request body" });
      }
  
      // converting request body to object
      const newCategory = {
        tag: req.body.tag,
        color: req.body.color,
      };
  
      // create a Category object from the Model
      const category = await Category.create(newCategory);
  
      // return the result to the client
      return res.status(201).send(category);
    } catch (error) {
      console.log(error.massage);
      res.status(500).send({ massage: error.massage });
    }
  };
  
  const getCategories = async (req, res) => {
    try {
      const categories = await Category.find({});
      return res.status(200).json({
        count: categories.length,
        data: categories,
      });
    } catch (error) {
      console.log(error.massage);
      res.status(500).send({ massage: error.massage });
    }
  };
  
  const getCategory = async (req, res) => {
    try {
      const { id } = req.params;
  
      const category = await Category.findById(id);
  
      return res.status(200).json({ category });
    } catch (error) {
      console.log(error.massage);
      res.status(500).send({ massage: error.massage });
    }
  };
  
  const editCategory = async (req, res) => {
    try {
      // body params validation
      if (!req.body.tag || !req.body.color) {
        return res.status(404).send({ message: "Invalid request body" });
      }
      // find and update
      const { id } = req.params;
      const result = await Category.findByIdAndUpdate(id, req.body);
  
      // result validation
      if (!result) {
        return res.status(404).send({ message: "Invalid request body" });
      } else {
        return res.status(200).send({ message: "Category updated successfully" });
      }
    } catch (error) {
      console.log(error.massage);
      res.status(500).send({ massage: error.massage });
    }
  };
  
  const deleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Category.findByIdAndDelete(id);
  
      if (!result) {
        return res.status(404).send({ message: "Invalid request body" });
      } else {
        return res.status(200).send({ message: "Category Deleted successfully" });
      }
    } catch (error) {
      console.log(error.massage);
      res.status(500).send({ massage: error.massage });
    }
  };
  
  module.exports = [createCategory, getCategories, getCategory, editCategory, deleteCategory];
  