"use client";
import { useDateRange } from "../context/DateContext";
import dayjs from "dayjs";

export default function Header() {
  const { startDate, endDate, activeField, setActiveField } = useDateRange();

  return (
    <div className="w-full flex justify-between items-center border-b border-base-300 pb-4">
      {/* زمان شروع */}
      <div
        onClick={() => setActiveField("start")}
        className={` flex-1 cursor-pointer px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
          activeField === "start"
            ? "text-primary font-bold border-b-2 border-primary"
            : "text-base-content/70"
        }`}
      >
        <span className="text-xl">🗓</span>
        <span>زمان شروع {startDate ? `: ${formatJalali(startDate)}` : ""}</span>
      </div>

      {/* زمان پایان */}
      <div
        onClick={() => setActiveField("end")}
        className={`flex-1 cursor-pointer px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
          activeField === "end"
            ? "text-primary font-bold border-b-2 border-primary"
            : "text-base-content/70"
        }`}
      >
        <span className="text-xl">🗓</span>
        <span>زمان پایان {endDate ? `: ${formatJalali(endDate)}` : ""}</span>
      </div>
    </div>
  );
}

function formatJalali(dateStr: string) {
  return dayjs(dateStr).format("D MMM");
}
