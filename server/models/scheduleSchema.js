const mongoose = require("mongoose");

const todoSchma = new mongoose.Schema({
  date: { type: Date, required: true },
  todos: [
    {
      content: { type: String, required: true },
      isCompleted: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model("todo", todoSchma);
