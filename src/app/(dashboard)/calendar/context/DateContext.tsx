import { createContext, useContext, useState, ReactNode } from "react";
type Mode = "start" | "end";

type DateRangeContextType = {
  startDate: string | null;
  endDate: string | null;
  setStartDate: (date: string | null) => void;
  setEndDate: (date: string | null) => void;
  activeField: Mode;
  setActiveField: (field: Mode) => void;
};

const DateRangeContext = createContext<DateRangeContextType | undefined>(
  undefined
);

export const useDateRange = () => {
  const ctx = useContext(DateRangeContext);
  if (!ctx)
    throw new Error("useDateRange must be used within DateRangeProvider");
  return ctx;
};

export function DateRangeProvider({ children }: { children: ReactNode }) {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [activeField, setActiveField] = useState<Mode>("start");

  return (
    <DateRangeContext.Provider
      value={{
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        activeField,
        setActiveField,
      }}
    >
      {children}
    </DateRangeContext.Provider>
  );
}
