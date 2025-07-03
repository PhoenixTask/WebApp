import React from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

type PersianDatePickerProps = {
  onChange: (date: any) => void;
};

export default function PersianDatePicker({
  onChange,
}: PersianDatePickerProps) {
  const today = new DateObject({ calendar: persian, locale: persian_fa });

  return (
    <DatePicker
      inputClass="py-1 text-center cursor-pointer shadow border border-base-300 rounded-2xl hover:bg-base-300 focus:outline-none"
      onChange={onChange}
      calendar={persian}
      locale={persian_fa}
      format="HH:mm - YYYY/MM/DD"
      calendarPosition="top-right"
      minDate={today}
      plugins={[
        <TimePicker key={"timePicker"} position="bottom" hideSeconds />,
      ]}
      portal
    />
  );
}
