// import Image from "next/image";
import MyCalendar from "@/components/MyCalendar";
import YearMonthSelector from "@/components/YearMonthSelector";

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto my-4">
      <YearMonthSelector />
      <MyCalendar />
    </div>
  );
}
