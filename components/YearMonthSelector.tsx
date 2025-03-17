"use client";

import { useState } from "react";
import YearSelectedModal from "./modals/YearSelectedModal";
import dayjs from "dayjs";
// store
import { useYearStore } from "@/store/store";
import { useMonthStore } from "@/store/store";

function YearMonthSelector() {
  const [yearModal, setYearModal] = useState<boolean>(false);
  // store값 가져오기
  const { selectedYear, setSelectedYear } = useYearStore();
  const { setMonth } = useMonthStore();

  const monthOptions = Array.from({ length: 12 }, (_, index) => ({
    value: index + 1,
    label: dayjs().month(index).format("MMMM"),
  }));

  return (
    <div>
      {yearModal ? (
        <YearSelectedModal
          setYearModal={setYearModal}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
      ) : null}
      <ul className="flex gap-4 relative">
        <li
          className="font-ptd-b text-3xl cursor-pointer hover:text-hover"
          onClick={() => setYearModal(true)}
        >
          {selectedYear}
          <span className="inline-block w-0.5 h-6 ml-4 bg-priamry"></span>
        </li>
        {monthOptions.map((month) => (
          <li
            onClick={() => setMonth(month.value)}
            key={month.value}
            className="flex items-center cursor-pointer"
          >
            {month.label}
            <span className="inline-block w-px h-3.5 ml-4 bg-secondary"></span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default YearMonthSelector;
