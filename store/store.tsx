import { create } from "zustand";
import dayjs from "dayjs";

interface YearStore {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

interface MonthStore {
  selectedMonth: number;
  setMonth: (month: number) => void;
}

// Year 상태 관리
export const useYearStore = create<YearStore>((set) => ({
  selectedYear: dayjs().year(), // 현재 연도
  setSelectedYear: (year) => set({ selectedYear: year }),
}));

// Month 상태 관리
export const useMonthStore = create<MonthStore>((set) => ({
  selectedMonth: dayjs().month() + 1,
  setMonth: (month) => set({ selectedMonth: month }),
}));
