import dayjs from "dayjs";

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

  return (
    <div className="border-t-2 border-primary">
      <ul className="grid grid-cols-7 w-[771px] border-l border-secondary">
        {tempDates.map((date, index) => {
          const isCurrentMonth = date.month() + 1 === month; // 현재 월 여부
          return (
            <li
              key={index}
              className={`flex justify-end w-[110px] h-[100px] p-[10px] border-b border-r border-secondary box-border text-sm ${
                date.isSame(dayjs(new Date()), "day")
                  ? "text-primary font-bold"
                  : isCurrentMonth
                    ? "text-calendar"
                    : "text-[#ddd]"
              }
              ${date.day() === 0 || date.day() === 6 ? "bg-[#FBFBFB]" : "bg-white"}
              `}
            >
              {date.date()}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CalendarGrid;
