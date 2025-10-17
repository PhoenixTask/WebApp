"use client";

import { Link, Icon } from "@/components/UI";
import clsx from "clsx";
import ChangeModeButton from "@/components/ChangeThemeMode";
import TodayDateTime from "./TodayDateTime";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import MobileSidebar from "../Sidebar/MobileSidebar";

export default function DashboardHeader() {
  const location = usePathname().slice(1);
  const t = useTranslations();

  const navLinks = [
    { to: "list", icon: "ListView", label: t("Dashboard.listLink") },
    { to: "column", icon: "ColumnView", label: t("Dashboard.columnLink") },
    { to: "calendar", icon: "Calendar", label: t("Dashboard.calendarLink") },
  ] as const;

  return (
    <>
      <div className="relative">
        <div className="flex items-center justify-between px-4 gap-x-5 mt-2 absolute">
          {/* logo or menu */}
          <div>
            <MobileSidebar />
          </div>

          {/* actions */}
          <div className="items-center gap-4 hidden 2xl:flex">
            <LanguageSwitcher />
            <ChangeModeButton />
          </div>
        </div>

        {/* nav links */}
        <div className="flex overflow-x-auto justify-end 2xl:justify-center py-2 border-b border-neutral bg-base-100">
          <div className="flex sm:gap-2">
            {navLinks.map(({ to, icon, label }) => (
              <Link
                key={to}
                to={to}
                textSize="S"
                weight="600"
                className={clsx(
                  "px-4 py-3 flex items-center gap-2 whitespace-nowrap hover:text-primary/70",
                  location.includes(to)
                    ? "text-primary border-b-2 border-primary"
                    : "text-base-content"
                )}
              >
                <Icon iconName={icon} />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* date */}
      <div className="flex justify-center font-medium py-3 sm:py-4 border-b border-neutral">
        <TodayDateTime />
      </div>
    </>
  );
}
