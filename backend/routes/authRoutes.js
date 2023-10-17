const express = require("express");
const { register, login } = require("../controllers/AuthController");
const createError = require("../middlewares/errorHandler");

const router = express.Router();

router.use(express.json());

router.post("/register", register);
router.post("/login", login);

module.exports = router;
