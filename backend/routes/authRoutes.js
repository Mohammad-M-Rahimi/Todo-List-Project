const express = require("express");
const {
  register,
  login,
  authenticateToken,
} = require("../controllers/AuthController");

const router = express.Router();

router.use(express.json());

router.post("/register", register);
router.post("/login", login);
router.post("/authenticateToken", authenticateToken);

module.exports = router;
