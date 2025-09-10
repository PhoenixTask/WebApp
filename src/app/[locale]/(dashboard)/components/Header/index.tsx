"use client";

import { Link, Icon } from "@/components/UI";
import clsx from "clsx";
import ChangeModeButton from "@/components/ChangeThemeMode";
import TodayDateTime from "./TodayDateTime";
import { usePathname } from "next/navigation";

export default function DashboardHeader() {
  const location = usePathname().slice(1);

  return (
    <>
      <div className="flex justify-between shadow">
        <div className="flex items-center py-6">
          <Link
            to="list"
            textSize="S"
            weight="600"
            className={clsx(
              "px-5 flex items-center gap-1 hover:text-primary/70",
              location.includes("list") ? "text-primary" : "text-base-content"
            )}
          >
            <Icon iconName="ListView" />
            <span>نمایش لیستی</span>
          </Link>
          <Link
            to="column"
            textSize="S"
            weight="600"
            className={clsx(
              "px-5 flex items-center gap-1 hover:text-primary/70",
              location.includes("column") ? "text-primary" : "text-base-content"
            )}
          >
            <Icon iconName="ColumnView" />
            <span>نمایش ستونی</span>
          </Link>
          <Link
            to="calendar"
            textSize="S"
            weight="600"
            className={clsx(
              "px-5 flex items-center gap-1 hover:text-primary/70",
              location.includes("calendar")
                ? "text-primary"
                : "text-base-content"
            )}
          >
            <Icon iconName="Calendar" />
            <span>نمایش تقویم</span>
          </Link>
        </div>
        <div className="flex items-center justify-center px-5">
          <ChangeModeButton />
        </div>
      </div>
      <div className="flex justify-center font-medium py-4.5 gap-4 border-y border-neutral">
        <TodayDateTime />
      </div>
    </>
  );
}
