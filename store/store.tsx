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

type TodoDateStore = {
  startDate: Date | null;
  setStartDate: (startDate: Date | null) => void;
  endDate: Date | null;
  setEndDate: (endDate: Date | null) => void;
};

type SelectedTodoStore = {
  selectedTodos: AllTodos | null;
  setSelectedTodos: (todo: AllTodos | null) => void;
};

type useAllTodosStore = {
  allTodos: AllTodos[] | null;
  setAllTodos: (selectedDateTodo: AllTodos[] | null) => void;
};

interface AllTodos {
  _id: string;
  date: Date;
  todos: TodoTask[];
}

type TodoTask = {
  _id: string;
  endDate: Date;
  task: string;
  isCompleted: boolean;
};

// 연 상태 관리
export const useYearStore = create<YearStore>((set) => ({
  selectedYear: dayjs().year(), // 현재 연도
  setSelectedYear: (year) => set({ selectedYear: year }),
}));

// 월 상태 관리
export const useMonthStore = create<MonthStore>((set) => ({
  selectedMonth: dayjs().month() + 1,
  setMonth: (month) => set({ selectedMonth: month }),
}));

// 선택한 투두 날짜 상태 관리
export const useTodoDateStore = create<TodoDateStore>((set) => ({
  startDate: new Date(),
  endDate: null,
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => set({ endDate }),
}));

// 해당 날짜의 task
export const useSelectedTodos = create<SelectedTodoStore>((set) => ({
  selectedTodos: null,
  setSelectedTodos: (todo) => set({ selectedTodos: todo }),
}));

// 모든 todo
export const useAllTodos = create<useAllTodosStore>((set) => ({
  allTodos: [],
  setAllTodos: (todos) => set({ allTodos: todos }),
}));
