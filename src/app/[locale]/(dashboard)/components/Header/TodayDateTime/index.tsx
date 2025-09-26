"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns-jalali";
import { useLocale } from "next-intl";
import { ConvertToFaNumber } from "@/functions/languageHandler";

export default function TodayDateTime() {
  const locale = useLocale();

  const [gregorianDate, setGregorianDate] = useState("");
  const [jalaliDate, setJalaliDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center gap-4 w-80 bg-base-content text-base-100 py-3 rounded-2xl shadow-elevated select-none">
      <div>{gregorianDate}</div>
      <div>{jalaliDate}</div>
      <div>{time}</div>
    </div>
  );

  function updateTime() {
    const now = new Date();

    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");

    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");

    if (locale === "en") {
      setGregorianDate(`${y}/${m}/${d}`);
      setJalaliDate(format(now, "yyyy/MM/dd"));
      setTime(`${hh}:${mm}:${ss}`);
    } else if (locale === "fa") {
      setGregorianDate(ConvertToFaNumber(`${y}/${m}/${d}`));
      setJalaliDate(ConvertToFaNumber(format(now, "yyyy/MM/dd")));
      setTime(ConvertToFaNumber(`${hh}:${mm}:${ss}`));
    }
  }
}
