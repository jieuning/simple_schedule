import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import DateRangePicker from "../DateRangePicker";
import api from "@/api/api";
import { useTodoDateStore } from "@/store/store";

interface TodoModalProps {
  setTodoModal: React.Dispatch<React.SetStateAction<boolean>>;
  onTodoAdded: () => void;
}

function TodoModal({ setTodoModal, onTodoAdded }: TodoModalProps) {
  const [newTodo, setNewTodo] = useState<string>("");

  // store가져옴
  const startDate = useTodoDateStore((state) => state.startDate);
  const endDate = useTodoDateStore((state) => state.endDate);

  useEffect(() => {
    console.log("startDate", startDate);
    console.log("endDate", endDate);
  }, [startDate, endDate]);

  const handleAddTodo = async () => {
    if (!newTodo.trim() || !startDate) {
      alert("시작일과 할일을 모두 입력해주세요.");
      return;
    }
    // add post 요청
    try {
      const response = await api.post("/api/todos/add/", {
        date: startDate.toISOString().split("T")[0],
        endDate: endDate ? endDate.toISOString().split("T")[0] : null,
        task: newTodo.trim(),
      });

      console.log("응답 결과:", response.data.message);

      setTodoModal(false); // 성공 후 모달 닫기
      setNewTodo(""); // 입력 초기화

      onTodoAdded(); // todo get요청 실행
    } catch (error: any) {
      console.error("에러 발생:", error);
      alert(
        error.response?.data?.message || "할일 추가 중 오류가 발생했습니다."
      );
    }
  };

  return (
    <div className="fixed flex items-center justify-center inset-0 backdrop-blur-xs bg-black/5 z-10">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-xs bg-white rounded-md">
        <div className="flex items-center justify-between p-2 text-sm border-b border-[#ccc] font-ptd-m">
          <h2>할일 생성</h2>
          <button
            onClick={() => setTodoModal(false)}
            className="cursor-pointer"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>
        <div className="flex flex-col items-left justify-center px-4 py-2.5 mt-2.5">
          <DateRangePicker />
          <label htmlFor="todo" className="text-sm mb-1 font-ptd-m">
            할일 추가
          </label>
          <input
            onChange={(e) => setNewTodo(e.target.value)}
            value={newTodo}
            className="border border-secondary rounded-sm px-1.5 py-0.5 focus:outline outline-priamry"
            type="text"
            id="todo"
          />
          <button
            onClick={handleAddTodo}
            className="px-3.5 py-1 mt-6 items-center font-ptd-m text-sm border border-secondary rounded-sm cursor-pointer hover:bg-hover"
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoModal;
