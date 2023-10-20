const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

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

const login = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(200).json({ message: info.message });
    }

    const token = generateToken(user._id);

    // Send the token as a JSON response
    res.status(200).json({ token });
  })(req, res, next);
};


const generateToken = (userId) => {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET);
};

const validateToken = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Server Error" });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(200).json({ message: "Token is valid", user: user });
  })(req, res, next);
};

module.exports = { login, register, validateToken };
