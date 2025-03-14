import dayjs from "dayjs";

interface CalendarGridProps {
  month: number;
  year: number;
}

function CalendarGrid({ month, year }: CalendarGridProps) {
  const firstDayOfMonth = dayjs(`${year}-${month}-01`); // 해당 월의 첫째 날
  const lastDayOfMonth = firstDayOfMonth.endOf("month"); // 해당 월의 마지막 날

  const firstDayWeekday = firstDayOfMonth.day(); // 해당 월이 시작하는 요일. 0(일요일)부터 시작
  const totalDaysInMonth = lastDayOfMonth.date(); // 해당 월의 총 일 수
  console.log(totalDaysInMonth);

  // 42개의 박스를 채우기 위한 빈 배열
  const totalGridCells = 42;

  // 날짜 배열 생성 (앞부분 공백 + 해당 월 날짜 + 뒷부분 공백)
  const tempDates = Array.from({ length: totalGridCells }, (_, index) => {
    const dateNumber = index - firstDayWeekday + 1; // 달력의 실제 날짜
    return dateNumber > 0 && dateNumber <= totalDaysInMonth
      ? dayjs(`${year}-${month}-${dateNumber}`)
      : null; // 날짜가 없는 칸은 `null`
  });

  return (
    <div className="border-t-2 border-priamry">
      <ul className="grid grid-cols-7 w-[770px] border-l border-secondary">
        {tempDates.map((date, index) => (
          <li
            key={index}
            className={`flex justify-end w-[110px] h-[100px] p-[10px] border-b border-r border-secondary box-border text-sm text-calendar ${date && date.isSame(dayjs(new Date()), "day") ? "text-priamry font-ptd-m" : "text-calendar"}`}
          >
            {date ? date.date() : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CalendarGrid;
