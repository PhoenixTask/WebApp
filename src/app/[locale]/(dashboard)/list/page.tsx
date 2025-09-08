"use client";

import CollapsibleBoard from "./components/CollapsibleBoard";
import { BoardType } from "@/types/board";
import { useBoards } from "@/hooks/useBoards";
import useActiveState from "@/store/useActiveState";
import useModal from "@/store/useModal";
import { Button } from "@/components/UI";
import { NO_BOARD_MSG, NO_PROJECT_MSG } from "@/constants";

export default function ListViewPage() {
  const { activeWorkspaceId, activeProjectId } = useActiveState();

  const { data: boards } = useBoards(activeProjectId);

  const { openModal } = useModal();

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

  return (
    <div className="p-2.5 w-full flex flex-col items-center gap-2">
      <Button
        onClick={() => openModal("create-board")}
        variant="outline"
        size="small"
      >
        ایجاد ستون
      </Button>
      {boards?.map(({ id, name, color }: BoardType) => (
        <CollapsibleBoard
          key={id}
          boardId={id}
          boardName={name}
          boardColor={color}
        />
      ))}
    </div>
  );
}
