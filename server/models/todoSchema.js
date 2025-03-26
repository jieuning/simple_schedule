const mongoose = require("mongoose");

const todoSchma = new mongoose.Schema(
  {
    date: { type: String, required: true },
    todos: [
      {
        endDate: { type: String, required: false, default: null },
        task: { type: String, required: true },
        isCompleted: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("todo", todoSchma);
