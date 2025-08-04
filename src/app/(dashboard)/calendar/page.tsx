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
import { NO_PROJECT_MSG } from "@/constants";
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

export default function CalendarViewPage() {
  const { openModal } = useModal();
  const { activeProjectId, activeWorkspaceId } = useActiveState();

  const today = new Date();

  const [startDate, setStartDate] = useState(
    format(startOfMonth(today), "yyyy-MM-dd")
  );

  const [endDate, setEndDate] = useState(
    format(endOfMonth(today), "yyyy-MM-dd")
  );

  const { data: tasks } = useTasksByDeadline({
    ProjectId: activeProjectId ?? "",
    Start: startDate,
    End: endDate,
  });

  const { mutateAsync: EditTaskDeadlineAPI } = useEditTaskDeadline();

  if (!activeProjectId || !activeWorkspaceId) {
    return (
      <div className="px-2.5 w-full flex flex-col items-center gap-2">
        <p className="m-auto">{NO_PROJECT_MSG}</p>
      </div>
    );
  }

  const events = ((tasks as TaskType[]) || []).map((task) => ({
    id: task.id,
    title: task.name,
    start: new Date(task.deadLine),
  }));

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-6xl mt-5">
        <FullCalendar
          locale={faLocale}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          initialDate={today}
          editable
          droppable
          selectable
          events={events}
          dateClick={handleDateClick}
          eventDrop={handleEventDrop}
          drop={handleExternalDrop}
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

    //todo: complete this
    // await EditTaskDeadlineAPI({
    //   taskId,
    //   deadLine: format(newDate, "yyyy-MM-dd"),
    // });
  }

  function handleDatesSet(arg: DatesSetArg): void {
    const newStart = format(startOfDay(arg.start), "yyyy-MM-dd");
    const newEnd = format(startOfDay(arg.end), "yyyy-MM-dd");

    setStartDate(newStart);
    setEndDate(newEnd);
  }
}
