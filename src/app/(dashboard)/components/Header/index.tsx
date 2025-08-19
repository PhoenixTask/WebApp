"use client";

import { Link, Icon } from "@/components/UI";
import clsx from "clsx";
import ChangeModeButton from "@/components/ChangeThemeMode";

type DashboardHeaderProps = {
  location: string;
};

export default function DashboardHeader({ location }: DashboardHeaderProps) {
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
              location === "list" ? "text-primary" : "text-base-content"
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
              location === "column" ? "text-primary" : "text-base-content"
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
              location === "calendar" ? "text-primary" : "text-base-content"
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
      <div className="flex items-center justify-between font-medium py-4.5 gap-4 border-y border-neutral">
        <div className="flex items-center gap-4 px-4"></div>
      </div>
    </>
  );
}
