"use client";

import { direction } from "@/functions/localeProperty";
import { useLocale, useTranslations } from "next-intl";

export default function NoProject() {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <div
      {...direction(locale)}
      className="px-2.5 w-full flex flex-col items-center gap-2"
    >
      <div className="m-auto">{t("Dashboard.noProject")}</div>
    </div>
  );
}
