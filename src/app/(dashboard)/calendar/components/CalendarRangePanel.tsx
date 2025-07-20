"use client";
import Header from "../../calendar/components/Header.tsx ";
import CalendarView from "../../calendar/components/CalendarView";
import QuickSelectMenu from "../../calendar/components/QuickSelectMenu";
import SubmitButton from "../../calendar/components/SubmitButton";
import { DateRangeProvider } from "../context/DateContext";

export default function CalendarRangePanel() {
  return (
    <DateRangeProvider>
      <div className="w-full flex flex-col  p-4 rounded-xl">
        <Header />

        <div className="flex gap-4 mt-4">
          <CalendarView />
          <QuickSelectMenu />
        </div>

        <div className="mt-6 text-left">
          <SubmitButton />
        </div>
      </div>
    </DateRangeProvider>
  );
}
