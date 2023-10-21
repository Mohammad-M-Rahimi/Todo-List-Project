const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

// Register Handle Controller
const register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    const newUser = new User({
      userName,
      email,
      password,
    });

    await newUser.save();
    res.status(201).send("User has been created.");
  } catch (error) {
    next(error);
  }
};

// Register Handle Controller
const login = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(200).json({ message: info.message });
    }

    const token = generateToken(user._id);

    res.status(200).json({ token });
  })(req, res, next);
};

const generateToken = (userId) => {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET);
};

// Auth Handler Controller
function authenticateToken(req, res) {
  const token = req.body.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    return res.status(200).json({ user });
  });
}

module.exports = { login, register, authenticateToken };
