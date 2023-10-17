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
    if (err) return next(err);

    if (!user) {
      return res.status(400).json({ message: info.message });
    }

    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET);
    return res.json({ token });
  })(req, res, next);
};

module.exports = { login, register };
