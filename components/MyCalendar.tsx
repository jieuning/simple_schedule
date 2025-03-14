"use client";

import { useEffect, useState } from "react";
import CalendarGrid from "./CalendarGrid";

function MyCalendar() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // 컴포넌트가 마운트된 후 클라이언트에서만 렌더링
  }, []);

  if (!isClient) return null; // 서버에서는 아무것도 렌더링하지 않음

  return <CalendarGrid month={3} year={2025} />;
}

export default MyCalendar;
