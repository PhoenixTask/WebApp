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
import { useEditTask, useTasks } from "@/hooks/useTasks";
import useActiveState from "@/store/useActiveState";
import { NO_PROJECT_MSG } from "@/constants";
import { isBefore, startOfDay } from "date-fns-jalali";
import useModal from "@/store/useModal";
import { TaskType } from "@/types/task";
import { BoardAndTasksType } from "@/types/board";

export default function CalendarViewPage() {
  const [tasksData, setTasksData] = useState<TaskType[]>([]);
  const { activeProjectId, activeWorkspaceId, activeBoardId } =
    useActiveState();
  const { data: boardsAndTasks, isLoading } =
    useBoardsAndTasks(activeProjectId);

  const { data: tasks } = activeBoardId
    ? useTasks(activeBoardId)
    : { data: [] };
  // console.log(tasks);
  const { openModal } = useModal();

  useEffect(() => {
    if (tasks) {
      setTasksData(tasks);
    }
  }, [tasks]);

  if (!activeProjectId || !activeWorkspaceId || activeBoardId) {
    return (
      <div className="px-2.5 w-full flex flex-col items-center gap-2">
        <p className="m-auto">{NO_PROJECT_MSG}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full  justify-center items-center flex">
      <div className="w-full h-full max-w-6xl   mt-5">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          editable
          droppable
          selectable
          events={
            tasks
              ? tasks.map((t) => ({
                  id: t.id,
                  title: t.name,
                  start: t.deadLine, // فیلد تاریخ
                }))
              : []
          }
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
    console.log(arg.date);
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
}
