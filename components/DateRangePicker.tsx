import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTodoDateStore } from "@/store/store";

function DateRangePicker() {
  // store가져옴
  const startDate = useTodoDateStore((state) => state.startDate);
  const endDate = useTodoDateStore((state) => state.endDate);
  const setStartDate = useTodoDateStore((state) => state.setStartDate);
  const setEndDate = useTodoDateStore((state) => state.setEndDate);

  useEffect(() => {
    console.log("startDate changed:", startDate);
    console.log("endDate changed:", endDate);
  }, [startDate, endDate]);

  return (
    <div className="flex justify-between px-4 pb-4 text-sm">
      <div className="flex flex-col items-center">
        <label className="block mb-1 font-ptd-m">시작일</label>
        <DatePicker
          className="w-26 px-1.5 py-0.5 text-center border border-secondary focus:outline outline-priamry rounded-sm"
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            // 종료일이 시작일보다 앞설 경우 초기화
            if (endDate && date && endDate < date) {
              setEndDate(null);
            }
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <div className="flex items-center mt-5">-</div>
      <div className="flex flex-col items-center">
        <label className="block mb-1 font-ptd-m">종료일</label>
        <DatePicker
          className="w-26 px-1.5 py-0.5 text-center border border-secondary focus:outline outline-priamry rounded-sm"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate ?? undefined} // null을 undefined로 변경
          placeholderText="날짜선택"
          dateFormat="yyyy-MM-dd"
          disabled={!startDate} // 시작일 선택 전에는 비활성화
        />
      </div>
    </div>
  );
}

export default DateRangePicker;
