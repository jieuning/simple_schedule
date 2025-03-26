import dayjs, { Dayjs } from "dayjs";
import clsx from "clsx";
import { useAllTodos, useSelectedTodos } from "@/store/store";
import { useState } from "react";

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
  // const remainingCells = 42 - (prevMonthDays + totalDaysInMonth); // 남은 셀 개수

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

  // store 가져옴
  const setSelectedTodos = useSelectedTodos((state) => state.setSelectedTodos);
  const AllTodos = useAllTodos((state) => state.AllTodos);

  // 선택된 날짜를 표시하기 위해 저장
  const [clickedIndex, setclickedIndex] = useState<number | null>(null);

  // 선택된 날짜와 모든 투두 날짜 중에 같은 날짜 찾기
  const onclickHandler = (selectedDate: Dayjs, index: number) => {
    const selectedFormat = selectedDate.format("YYYY-MM-DD");
    const selectedTodo = AllTodos?.find(
      (todo) => dayjs(todo.date).format("YYYY-MM-DD") === selectedFormat
    );
    setclickedIndex(index);
    return selectedTodo
      ? setSelectedTodos(selectedTodo)
      : setSelectedTodos(null);
  };

  return (
    <div className="border-t-2 border-primary">
      <ul className="grid grid-cols-7 w-[771px] border-l border-secondary">
        {tempDates.map((date, index) => {
          const isCurrentMonth = date.month() + 1 === month; // 현재 월 여부
          return (
            <li
              key={index}
              onClick={() => onclickHandler(date, index)}
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
              <span className="z-10 cursor-pointer">{date.date()}</span>
              <span
                className={clsx(
                  "absolute top-0 left-0 w-full h-full",
                  clickedIndex === index && "bg-[#FFDC92]"
                )}
              ></span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CalendarGrid;
