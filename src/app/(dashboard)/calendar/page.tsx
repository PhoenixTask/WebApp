"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import Button from "@/components/UI/Button";
import useModal from "@/store/useModal";
import useActiveState from "@/store/useActiveState";
import { useBoards, useBoardsAndTasks } from "@/hooks/useBoards";
import { NO_BOARD_MSG, NO_PROJECT_MSG } from "@/constants";

interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number | String;
}

export default function CalendarViewPage() {
  const { activeWorkspaceId, activeProjectId } = useActiveState();
  const [currentBoardIndex, setCurrentBoardIndex] = useState(0);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const { openModal } = useModal();

  const { storeActiveTask, storeActiveBoard } = useActiveState();

  function addEvent(data: DropArg) {
    const event = {
      start: data.date.toISOString(),
      title: data.draggedEl.innerText,
      allDay: data.allDay,
      id: new Date().getTime(),
    };
    setAllEvents([...allEvents, event]);
  }

  function handleDeleteModal(data: { event: { id: string } }) {
    storeActiveTask(data.event.id);
    openModal("delete-task");
  }

  const { data: boards } = useBoards(activeProjectId);

  const { data: boardsAndTasks } = useBoardsAndTasks(activeProjectId);

  useEffect(() => {
    let draggableEl = document.getElementById("draggable-el");
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          let title = eventEl.getAttribute("title");
          let id = eventEl.getAttribute("data-id");
          return { title, id };
        },
      });
    }
  }, [boardsAndTasks, currentBoardIndex]);

  const handlePrevBoard = () => {
    setCurrentBoardIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextBoard = () => {
    if (!boardsAndTasks?.data) return;
    setCurrentBoardIndex((prev) =>
      prev < boardsAndTasks.data.length - 1 ? prev + 1 : prev
    );
  };

  const tasksFromServer =
    boardsAndTasks?.data.flatMap((board) => board.taskResponses) ?? [];

  const calendarEvents = tasksFromServer.map((task) => ({
    id: task.id,
    title: task.name,
    start: task.deadLine, // فرض بر اینکه deadline وجود دارد
  }));

  function handleDateClick(arg: { date: Date; allDay: boolean }) {
    if (!boardsAndTasks?.data) return;
    storeActiveBoard(boardsAndTasks.data[currentBoardIndex].id);
    openModal("create-task", { selectedDate: arg.date });
    console.log(arg);
  }

  if (!activeProjectId || !activeWorkspaceId) {
    return (
      <div className="px-2.5 w-full flex flex-col items-center gap-2">
        <div className="m-auto">
          <p>{NO_PROJECT_MSG}</p>
        </div>
      </div>
    );
  }

  if (boards?.length === 0) {
    return (
      <div className="px-2.5 w-full flex flex-col items-center gap-5">
        {/* create new board */}
        <Button
          onClick={() => openModal("create-board")}
          variant="outline"
          size="small"
        >
          ایجاد ستون
        </Button>
        <div className="m-auto">
          <p>{NO_BOARD_MSG}</p>
        </div>
      </div>
    );
  }

  if (!boardsAndTasks?.data?.length) return <div>در حال بارگذاری...</div>;

  return (
    <>
      <nav
        dir="ltr"
        className="flex justify-between mb-12 border-b border-violet-100 p-4"
      >
        <h1 className="font-bold text-2xl text-gray-700">Calender</h1>
      </nav>
      <main
        dir="ltr"
        className="flex flex-col min-h-screen items-center justify-between p-24"
      >
        <div className="grid grid-cols-10">
          <div className="col-span-8">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "resourceTimelineWook, dayGridMonth,timeGridWeek",
              }}
              events={calendarEvents}
              nowIndicator={true}
              editable={true}
              droppable={true}
              selectable={true}
              selectMirror={true}
              dateClick={handleDateClick}
              drop={(data) => addEvent(data)}
              eventClick={(data) => handleDeleteModal(data)}
            />
          </div>

          <div
            id="draggable-el"
            className="ml-8 w-full border p-2 rounded-md mt-16 lg:h-1/2
             bg-base-100 text-base-content border-base-300"
          >
            {boardsAndTasks?.data.length > 0 && (
              <>
                {/* دکمههای چپ و راست */}
                <div className="flex items-center justify-between px-2 mb-2">
                  <button onClick={handlePrevBoard} className="text-xl">
                    {"←"}
                  </button>
                  <h1 className="font-bold text-md text-center">
                    {boardsAndTasks.data[currentBoardIndex].name}
                  </h1>
                  <button onClick={handleNextBoard} className="text-xl">
                    {"→"}
                  </button>
                </div>

                {/* لیست تسکهای این بورد */}
                <div className="space-y-2 overflow-y-auto max-h-60 pr-2">
                  {boardsAndTasks.data[currentBoardIndex].taskResponses
                    ?.length > 0 ? (
                    boardsAndTasks.data[currentBoardIndex].taskResponses.map(
                      (task) => (
                        <div
                          title={task.name}
                          data-id={task.id}
                          key={task.id}
                          className="fc-event p-2 rounded-md border text-sm
             bg-base-200 text-base-content border-base-300"
                        >
                          {task.name}
                        </div>
                      )
                    )
                  ) : (
                    <div className="text-gray-500 text-sm text-center">
                      تسکی وجود ندارد
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
