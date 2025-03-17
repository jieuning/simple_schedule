import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import dayjs from "dayjs";

interface YearSelectedModalProps {
  setYearModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

function YearSelectedModal({
  setYearModal,
  selectedYear,
  setSelectedYear,
}: YearSelectedModalProps) {
  const nextYear = dayjs().add(50, "year").year(); // 현재 연도에서 50년 후
  const lastYear = dayjs().subtract(10, "year").year(); // 현재 연도에서 10년 전

  // 10년 전부터 50년 후까지의 배열 생성
  const getYearRange = () => {
    const years = [];
    for (let year = lastYear; year <= nextYear; year++) {
      years.push(year);
    }
    return years;
  };

  return (
    <div className="fixed flex items-center justify-center inset-0 backdrop-blur-xs bg-black/5 z-10">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3xs h-40 bg-white rounded-md">
        <div className="flex items-center justify-between p-2 text-sm border-b border-[#ccc] font-ptd-m">
          <h2>날짜 선택</h2>
          <button
            onClick={() => setYearModal((close) => !close)}
            className="cursor-pointer"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>
        <div className="flex flex-col gap-5 items-center justify-center px-11 py-2.5 mt-2.5">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="w-full py-1 text-center border border-[#ddd] rounded-sm outline-none cursor-pointer"
          >
            {getYearRange().map((year, index) => (
              <option value={year} key={index}>
                {year}
              </option>
            ))}
          </select>
          <button
            onClick={() => setYearModal(false)}
            className="px-3.5 py-1 items-center font-ptd-m text-sm border border-secondary rounded-sm cursor-pointer hover:bg-hover"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default YearSelectedModal;
