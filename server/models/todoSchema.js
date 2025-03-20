const mongoose = require("mongoose");

const todoSchma = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  todos: [
    {
      task: { type: String, required: true },
      isCompleted: { type: Boolean, default: false },
    },
  ],
  default: [],
});

module.exports = mongoose.model("todo", todoSchma);
