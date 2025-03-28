import { BsPlusLg } from "react-icons/bs";
import { useEffect, useState } from "react";
// components
import api from "../api/api";
import TodoModal from "./modals/TodoModal";
// store
import { useAllTodos, useSelectedTodos } from "@/store/store";

type AllTodo = {
  _id: string;
  date: Date;
  todos: TodoTask[];
};

type TodoTask = {
  endDate: Date;
  task: string;
  isCompleted: boolean;
};

function MyTodoList() {
  const [todoModal, setTodoModal] = useState<boolean>(false);

  // store 가져옴
  const selectedTodos = useSelectedTodos((state) => state.selectedTodos);
  const setAllTodos = useAllTodos((state) => state.setAllTodos);

  const fetchData = async () => {
    try {
      const response = await api("/api/todos/");
      setAllTodos(response.data);
    } catch (error) {
      console.log("오류", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mt-6 ">
      {todoModal ? (
        <TodoModal setTodoModal={setTodoModal} onTodoAdded={fetchData} />
      ) : null}
      <div className="relative">
        <div className="text-center text-sm">TODO&apos;S</div>
        <button
          onClick={() => setTodoModal(true)}
          className="absolute top-0 right-0 mr-2 hover:rotate-45 transition-all duration-300 cursor-pointer"
        >
          <BsPlusLg size={20} />
        </button>
      </div>
      <div className="w-[430px] mt-1.5 border-t-2 h-[600px] overflow-hidden overflow-y-scroll">
        <ul className="px-3">
          {Array.from({ length: 20 }).map((_, index) => {
            const todo = selectedTodos?.todos[index];
            return (
              <li
                key={todo?._id || index}
                className="flex items-center h-[33px] p-1 border-b border-secondary font-diary"
              >
                <input type="checkbox" disabled={!todo} />
                <span className="mt-1 pl-1.5 text-sm text-ellipsis">
                  {todo?.task || ""}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default MyTodoList;
