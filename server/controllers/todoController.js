const todo = require("../models/scheduleSchema");

// 모든 todo 조회
exports.getTodos = async (req, res) => {
  try {
    const todos = await todo.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
