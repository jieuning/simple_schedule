const Todo = require("../models/todoSchema");

// 모든 todo 조회
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "할 일 목록을 불러오는 중 오류 발생", error });
  }
};

// 새로운 혹은 기존 날짜에 todo 추가
exports.addTodo = async (req, res) => {
  const { date, endDate, task } = req.body;

  try {
    // 해당 날짜가 존재하면 기존 배열에 추가
    const findTodo = await Todo.findOne({ date });

    if (findTodo) {
      findTodo.todos.push({
        endDate,
        task,
        isCompleted: false,
      });
      await findTodo.save();
      return res
        .status(200)
        .json({ message: "추가되었습니다.", todo: findTodo });
    }

    // 해당 날짜가 없으면 새로 생성
    const newTodo = new Todo({
      date,
      todos: [{ endDate, task, isCompleted: false }],
    });
    await newTodo.save();
    res
      .status(201)
      .json({ message: "새로운 날짜에 추가되었습니다.", todo: newTodo });
  } catch (error) {
    console.error("서버 에러 발생:");
    console.error("에러 이름:", error.name);
    console.error("에러 메시지:", error.message);
    console.error("전체 에러 객체:", error);
  }
};

// todo 상태 업데이트
exports.toggleTodoStatus = async (req, res) => {
  const { date, task } = req.body;

  try {
    let todoEntry = await Todo.findOne({ date });

    // 해당 날짜의 todo가 존재하지 않을 때
    if (!todoEntry) {
      return res
        .status(404)
        .json({ message: "해당 날짜의 todo가 존재하지 않습니다." });
    }

    // 해당 날짜의 todo안의 task를 찾을 수 없을 때
    let foundTask = todoEntry.todos.find((t) => t.task === task);
    if (!foundTask) {
      return res.status(404).json({ message: "해당 task를 찾을 수 없습니다." });
    }

    // 해당 task의 상태가 변경될 때
    foundTask.isCompleted = !foundTask.isCompleted;
    await todoEntry.save();
    res.status(200).json({
      massage: `${task}의 상태가 ${foundTask.isCompleted ? "true" : "false"}으로 변경되었습니다.`,
      todo: todoEntry,
    });
  } catch (error) {
    res.status(500).json({ message: "할 일 상태 변경 중 오류 발생", error });
  }
};

// 할 일 삭제
exports.deleteTodo = async (req, res) => {
  const { date, task } = req.body;

  try {
    // 해당 날짜의 todo 찾기
    let todoEntry = await Todo.findOne({ date });

    if (!todoEntry) {
      return res.status(404).json({ message: "해당 날짜의 todo가 없습니다." });
    }

    // 해당 날짜의 todos 배열에서 특정 task 제거
    const updatedTodos = todoEntry.todos.filter((t) => t.task !== task);

    if (updatedTodos.length === todoEntry.todos.length) {
      return res
        .status(404)
        .json({ message: "삭제할 할 일을 찾을 수 없습니다." });
    }

    // todos 배열을 업데이트 (해당 task 제거)
    todoEntry.todos = updatedTodos;

    // 만약 모든 할 일이 삭제되었다면 해당 날짜의 Todo 문서도 삭제
    if (todoEntry.todos.length === 0) {
      await Todo.deleteOne({ date: new Date(date) });
      return res.status(200).json({
        message: "모든 할 일이 삭제되어 해당 날짜의 todo도 삭제되었습니다.",
      });
    }

    await todoEntry.save(); // 변경 사항 저장

    res.status(200).json({
      message: `'${task}'가 삭제되었습니다.`,
      todo: todoEntry,
    });
  } catch (error) {
    res.status(500).json({ message: "할 일 삭제 중 오류 발생", error });
  }
};
