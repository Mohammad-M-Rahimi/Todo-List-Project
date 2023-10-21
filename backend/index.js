// requires and imports
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const cors = require("cors");
const passport = require("passport");

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

// express app & env settings
const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
require("./config/passport-config")(passport);

// Routes
app.use("/api/task", taskRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/auth", authRoutes);


// MongoDB connection
const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
