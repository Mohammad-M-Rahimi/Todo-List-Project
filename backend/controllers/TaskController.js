const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    // Validating the request parameters
    if (!req.body.name || !req.body.category) {
      return res.status(404).send({ message: "Invalid request body" });
    }

    // converting request body to object
    const newTask = {
      name: req.body.name,
      category: req.body.category,
    };

    // create a Task object from the TaskModel
    const task = await Task.create(newTask);

    // return the result to the client (showing the Task)
    return res.status(201).send(task);
  } catch (error) {
    console.log(error.massage);
    res.status(500).send({ massage: error.massage });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    return res.status(200).json({
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.log(error.massage);
    res.status(500).send({ massage: error.massage });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    return res.status(200).json({ task });
  } catch (error) {
    console.log(error.massage);
    res.status(500).send({ massage: error.massage });
  }
};

const editTask = async (req, res) => {
  try {
    // body params validation
    if (!req.body.name || !req.body.category) {
      return res.status(404).send({ message: "Invalid request body" });
    }
    // find and update
    const { id } = req.params;
    const result = await Task.findByIdAndUpdate(id, req.body);

    // result validation
    if (!result) {
      return res.status(404).send({ message: "Invalid request body" });
    } else {
      return res.status(200).send({ message: "Task updated successfully" });
    }
  } catch (error) {
    console.log(error.massage);
    res.status(500).send({ massage: error.massage });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Task.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "Invalid request body" });
    } else {
      return res.status(200).send({ message: "Task Deleted successfully" });
    }
  } catch (error) {
    console.log(error.massage);
    res.status(500).send({ massage: error.massage });
  }
};

module.exports = [createTask, getTasks, getTask, editTask, deleteTask];
