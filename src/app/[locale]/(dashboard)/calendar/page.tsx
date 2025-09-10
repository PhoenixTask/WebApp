"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  DateClickArg,
  DropArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventDropArg, DatesSetArg } from "@fullcalendar/core";
import { useTasksByDeadline, useEditTaskDeadline } from "@/hooks/useTasks";
import useActiveState from "@/store/useActiveState";
import {
  format,
  isBefore,
  startOfDay,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import useModal from "@/store/useModal";
import { TaskType } from "@/types/task";
import faLocale from "@fullcalendar/core/locales/fa";
import { useState } from "react";
import { DateToString } from "@/functions/date";
import { useLocale } from "next-intl";
import NoProject from "../components/NoProject";

export default function CalendarViewPage() {
  const { openModal } = useModal();

  const { activeProjectId, activeWorkspaceId } = useActiveState();

  const today = new Date();

  const locale = useLocale();

  const [startDate, setStartDate] = useState(
    format(startOfMonth(today), "yyyy-MM-dd")
  );

  const [endDate, setEndDate] = useState(
    format(endOfMonth(today), "yyyy-MM-dd")
  );

  const { mutateAsync: EditTaskDeadlineAPI } = useEditTaskDeadline();

  const { data: tasks } = useTasksByDeadline({
    ProjectId: activeProjectId ?? "",
    Start: startDate,
    End: endDate,
  });

  const events = (tasks ?? []).map((t: TaskType) => ({
    id: t?.id || "",
    title: t?.name || "Untitled Task",
    start: t?.deadLine
      ? new Date(t.deadLine).toISOString()
      : new Date().toISOString(),
  }));
  const todayBarrier = startOfDay(new Date());

  if (!activeProjectId || !activeWorkspaceId) return <NoProject />;

  return (
    <div className="flex justify-center items-center">
      <div className="w-full h-[720px] max-w-6xl mt-5 overflow-hidden">
        <FullCalendar
          {...calendarLanguage(locale)}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          initialDate={new Date()}
          editable
          droppable
          selectable
          events={events}
          eventAllow={(info) =>
            startOfDay(info.start).getTime() >= todayBarrier.getTime()
          }
          dateClick={handleDateClick}
          eventDrop={handleEventDrop}
          datesSet={handleDatesSet}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek",
          }}
        />
      </div>
    </div>
  );

  function calendarLanguage(locale: string) {
    if (locale === "fa") {
      return { locale: faLocale };
    }
    return {};
  }

  function handleDateClick(arg: DateClickArg) {
    const today = startOfDay(new Date());
    const selected = startOfDay(arg.date);
    if (isBefore(selected, today)) return;

    openModal("create-task", {
      selectedDate: arg.date,
    });
  }

  function handleExternalDrop(arg: DropArg): void {
    console.log("handleExternalDrop", arg);
  }

  async function handleEventDrop(arg: EventDropArg): Promise<void> {
    const taskId = arg.event.id;
    const newDate = arg.event.start;
    if (!taskId || !newDate) return;

    await EditTaskDeadlineAPI({
      taskId,
      newDeadLine: DateToString(newDate),
    });
  }

  function handleDatesSet(arg: DatesSetArg): void {
    const newStart = format(startOfDay(arg.start), "yyyy-MM-dd");
    const newEnd = format(startOfDay(arg.end), "yyyy-MM-dd");

    setStartDate(newStart);
    setEndDate(newEnd);
  }
}
