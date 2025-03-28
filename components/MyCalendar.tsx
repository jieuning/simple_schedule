"use client";

import dayjs from "dayjs";
import "dayjs/locale/en";
import { useEffect, useState } from "react";
import CalendarGrid from "./CalendarGrid";
// store
import { useYearStore } from "@/store/store";
import { useMonthStore } from "@/store/store";

function MyCalendar() {
  const [isClient, setIsClient] = useState(false);
  // store값 가져옴
  const { selectedYear } = useYearStore();
  const { selectedMonth } = useMonthStore();

  useEffect(() => {
    setIsClient(true); // 컴포넌트가 마운트된 후 클라이언트에서만 렌더링
  }, []);

  if (!isClient) return null; // 서버에서는 아무것도 렌더링하지 않음

  return (
    <div className="mt-6">
      <ul className="flex mb-1.5">
        {Array.from({ length: 7 }).map((_, index) => (
          <li
            key={index}
            className="flex justify-center w-[110px] text-sm week-list"
          >
            {dayjs().day(index).locale("en").format("ddd")}
          </li>
        ))}
      </ul>
      <CalendarGrid month={selectedMonth} year={selectedYear} />
    </div>
  );
}

export default MyCalendar;
