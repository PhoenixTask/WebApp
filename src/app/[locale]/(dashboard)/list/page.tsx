"use client";

import CollapsibleBoard from "./components/CollapsibleBoard";
import { BoardType } from "@/types/board";
import { useBoards } from "@/hooks/useBoards";
import useActiveState from "@/store/useActiveState";
import useModal from "@/store/useModal";
import { Button } from "@/components/UI";
import { useLocale, useTranslations } from "next-intl";
import NoProject from "@/components/NoProject";
import NoBoard from "@/components/NoBoard";
import { useProtect } from "@/providers/ProtectContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ListViewPage() {
  const router = useRouter();
  const { isAuthenticated } = useProtect();

  const locale = useLocale();

  const { activeWorkspaceId, activeProjectId } = useActiveState();

  const { data: boards } = useBoards(activeProjectId);

  const { openModal } = useModal();

  const t = useTranslations();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/${locale}/login`);
    }
  }, [isAuthenticated, router]);

  if (!activeProjectId || !activeWorkspaceId) return <NoProject />;

  if (boards?.length === 0) return <NoBoard />;

  return (
    <div className="flex flex-col items-center p-2.5 w-full gap-2">
      <Button
        onClick={() => openModal("create-board")}
        variant="outline"
        size="small"
      >
        {t("Dashboard.newBoard")}
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
