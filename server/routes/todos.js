const express = require("express");
const {
  getTodos,
  addTodo,
  toggleTodoStatus,
} = require("../controllers/todoController");

const router = express.Router;

// 전체 todo 가져오기
router.get("/", getTodos);
// todo 추가
router.post("/add", addTodo);
// todo 상태 변경
router.put("/toggle", toggleTodoStatus);
// todo 삭제
router.delete("/delete", deleteTodo);

module.exports = router;
