const mongoose = require("mongoose");

const validColors = ["red", "blue", "green", "yellow", "purple", "orange"];

const CategorySchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return validColors.includes(v);
      },
      message: (props) => `${props.value} is not a valid color.`,
    },
  },
});

module.exports = mongoose.model("Category", CategorySchema);
