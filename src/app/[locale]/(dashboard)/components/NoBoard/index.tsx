"use client";

import { Button } from "@/components/UI";
import { direction } from "@/functions/languageHandler";
import useModal from "@/store/useModal";
import { useLocale, useTranslations } from "next-intl";

export default function NoBoard() {
  const locale = useLocale();
  const t = useTranslations();

  const { openModal } = useModal();

  return (
    <div
      {...direction(locale)}
      className="px-2.5 w-full flex flex-col items-center gap-5"
    >
      <Button
        onClick={() => openModal("create-board")}
        variant="outline"
        size="default"
      >
        {t("Dashboard.newBoard")}
      </Button>
      <div className="m-auto">{t("Dashboard.noBoard")}</div>
    </div>
  );
}
