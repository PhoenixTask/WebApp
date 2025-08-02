"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  DateClickArg,
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventDropArg } from "@fullcalendar/core";
import { toast } from "react-hot-toast";
import { useBoardsAndTasks } from "@/hooks/useBoards";
import { useEditTask, useTasks, useTasksByDeadline } from "@/hooks/useTasks";
import useActiveState from "@/store/useActiveState";
import { NO_PROJECT_MSG } from "@/constants";
import {
  endOfMonth,
  format,
  isBefore,
  startOfDay,
  startOfMonth,
} from "date-fns";
import useModal from "@/store/useModal";
import { TaskType } from "@/types/task";
import { BoardAndTasksType } from "@/types/board";
import faLocale from "@fullcalendar/core/locales/fa";
import { DateToString, MiladiToShamsi } from "@/functions/date";
export default function CalendarViewPage() {
  const [tasksData, setTasksData] = useState<BoardAndTasksType[]>([]);
  const { openModal } = useModal();

  const {
    activeProjectId,
    activeWorkspaceId,
    activeBoardId,
    storeActiveBoard,
  } = useActiveState();
  const { data: boardsAndTasks, isLoading } =
    useBoardsAndTasks(activeProjectId);

  const today = new Date();

  const startDate = format(startOfMonth(today), "yyyy/MM/dd");
  const endDate = format(endOfMonth(today), "yyyy/MM/dd");
  const start = toDbDateRaw(startDate); // "8/1/2025"
  const end = toDbDateRaw(endDate);
  console.log("today is: ", today);
  console.log("start is: ", start);
  console.log("end is: ", end);
  const { data: tasks } = useTasksByDeadline({
    ProjectId: activeProjectId ?? "",
    Start: "2025/01/01",
    End: "2045/12/31",
  });

  if (!activeProjectId || !activeWorkspaceId) {
    return (
      <div className="px-2.5 w-full flex flex-col items-center gap-2">
        <p className="m-auto">{NO_PROJECT_MSG}</p>
      </div>
    );
  }

  // console.log(tasks);

  const events = ((tasks as TaskType[]) || []).map((task) => ({
    id: task.id,
    title: task.name,
    start: new Date(task.deadLine),
  }));

  console.log(events);
  return (
    <div className="w-full h-full  justify-center items-center flex">
      <div className="w-full h-full max-w-6xl   mt-5">
        <FullCalendar
          locale={faLocale}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          initialDate={new Date()}
          editable
          droppable
          selectable
          events={events}
          dateClick={handleDateClick}
          eventDrop={handleEventDrop}
          drop={handleExternalDrop}
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

    if (isBefore(selected, today)) {
      alert("امکان ساخت تسک روی روزهای گذشته وجود ندارد.");
      return;
    }
    openModal("create-task", {
      selectedDate: arg.date,
    });
  }

  function handleExternalDrop(arg: DropArg): void {
    console.log("handleExternalDrop", arg);
  }

  function handleEventDrop(arg: EventDropArg): void {
    console.log("handleEventDrop", arg);
  }

  function toDbDateRaw(date: Date | string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1; // بدون صفر اضافه
    const day = d.getDate(); // بدون صفر اضافه
    return `${month}/${day}/${year}`;
  }
}
