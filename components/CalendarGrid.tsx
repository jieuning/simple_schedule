import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
// 스토어
import { useAllTodos, useSelectedTodos } from "@/store/store";
// 아이콘
import { CgNotes } from "react-icons/cg";
import { FaCheck } from "react-icons/fa6";

interface CalendarGridProps {
  month: number;
  year: number;
}

function CalendarGrid({ month, year }: CalendarGridProps) {
  const firstDayOfMonth = dayjs(`${year}-${month}-01`); // 해당 월의 첫째 날
  const lastDayOfMonth = firstDayOfMonth.endOf("month"); // 해당 월의 마지막 날

  const firstDayWeekday = firstDayOfMonth.day(); // 해당 월이 시작하는 요일 (0: 일요일)
  const totalDaysInMonth = lastDayOfMonth.date(); // 해당 월의 총 일 수

  // 이전 달 정보 가져오기
  const prevMonthLastDay = firstDayOfMonth.subtract(1, "month").endOf("month"); // 이전 달의 마지막 날
  const prevMonthDays = firstDayWeekday; // 이전 달에서 가져올 날짜 개수

  // 다음 달 정보 가져오기
  const nextMonthStart = firstDayOfMonth.add(1, "month").startOf("month"); // 다음 달의 첫째 날

  // 날짜 배열 생성
  const tempDates = Array.from({ length: 42 }, (_, index) => {
    if (index < prevMonthDays) {
      // 이전 달 날짜
      return prevMonthLastDay.subtract(prevMonthDays - 1 - index, "day");
    } else if (index < prevMonthDays + totalDaysInMonth) {
      // 현재 달 날짜
      return firstDayOfMonth.add(index - prevMonthDays, "day");
    } else {
      // 다음 달 날짜
      return nextMonthStart.add(
        index - (prevMonthDays + totalDaysInMonth),
        "day"
      );
    }
  });

  // 스토어 가져옴
  const setSelectedTodos = useSelectedTodos((state) => state.setSelectedTodos);
  const allTodos = useAllTodos((state) => state.allTodos);

  // 오늘 날짜 인덱스
  const todayIndex = tempDates.findIndex((d) => d.isSame(dayjs(), "day"));

  // 선택된 날짜 인덱스 저장
  const [clickedIndex, setclickedIndex] = useState<number | null>(todayIndex);

  // AllTodos 로딩 후 오늘자 투두 렌더링
  useEffect(() => {
    const today = tempDates[todayIndex].format("YYYY-MM-DD");
    const todayTodo = allTodos?.find(
      (todo) => dayjs(todo.date).format("YYYY-MM-DD") === today
    );
    setSelectedTodos(todayTodo ?? null);
  }, [allTodos]);

  // 선택된 날짜와 모든 투두 날짜 중에 같은 날짜 찾기
  const onclickHandler = (selectedDate: Dayjs, index: number) => {
    const selectedFormat = selectedDate.format("YYYY-MM-DD");

    const selectedTodo = allTodos?.find(
      (todo) => dayjs(todo.date).format("YYYY-MM-DD") === selectedFormat
    );
    setclickedIndex(index);

    // 스토어에 해당 날짜의 투두 저장
    return selectedTodo
      ? setSelectedTodos(selectedTodo)
      : setSelectedTodos(null);
  };

  // 특정 날짜에 해당하는 투두가 전부 완료됐는지 판단하는 함수
  const isDateAllCompleted = (date: Dayjs) => {
    const dateFormat = date.format("YYYY-MM-DD");

    const targetTodo = allTodos?.find(
      (todo) => dayjs(todo.date).format("YYYY-MM-DD") === dateFormat
    );

    // 해당 날짜에 투두가 없으면 false or null로 처리
    if (!targetTodo) return null;

    // 모두 완료되었는지 판단
    return targetTodo.todos.every((todo) => todo.isCompleted);
  };

  return (
    <div className="border-t-2 border-primary">
      <ul className="grid grid-cols-7 w-[771px] border-l border-secondary">
        {tempDates.map((date, index) => {
          const dateFormat = date.format("YYYY-MM-DD");
          const isCurrentMonth = date.month() + 1 === month; // 현재 월 여부
          const hasTodo = allTodos?.some(
            (todo) => dayjs(todo.date).format("YYYY-MM-DD") === dateFormat
          ); // 해당 날짜에 투두가 있는지 확인
          const isAllCompleted = isDateAllCompleted(date);

          return (
            <li
              key={index}
              className={`relative flex justify-end w-[110px] h-[100px] p-[10px] border-b border-r border-secondary box-border text-sm ${
                date.isSame(dayjs(new Date()), "day")
                  ? "text-primary font-bold"
                  : isCurrentMonth
                    ? "text-calendar"
                    : "text-[#ddd]"
              }
              ${date.day() === 0 || date.day() === 6 ? "bg-[#FBFBFB]" : "bg-white"}
              `}
            >
              <div className="flex gap-1.5 h-5 items-center">
                {hasTodo && isAllCompleted !== null && (
                  <span className="z-20">
                    <FaCheck
                      size={14}
                      color={isAllCompleted ? "green" : "red"}
                    />
                  </span>
                )}
                <span
                  onClick={() => onclickHandler(date, index)}
                  className="z-10 cursor-pointer"
                >
                  {date.date()}
                </span>
              </div>
              <span
                className={`
                  absolute top-0 left-0 w-full h-full
                  ${clickedIndex === index && "bg-[#FFFDEB]"}`}
              ></span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CalendarGrid;
