import Icon from "@/components/Icon";
import { Button, Input, Link } from "@/components/UI";
import clsx from "clsx";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";

type DashboardHeaderProps = {
  location: string;
};

export default function DashboardHeader({ location }: DashboardHeaderProps) {
  const { toggleTheme, theme } = useContext(ThemeContext);
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
        <div className="flex items-center justify-center">
          <Button
            onClick={toggleTheme}
            mode="child"
            className="flex justify-center items-center transition-colors duration-300 hover:text-neutral-content  hover:bg-base-100 p-2 bg-neutral text-neutral-content border rounded-full"
          >
            {/* todo: DarkMode functionality */}
            {theme === "light" ? (
              <Icon iconName="DarkMode" />
            ) : (
              <Icon iconName="LightMode" />
            )}
          </Button>

          <div className="pr-5 py-1">{/* <Share /> todo: share Modal */}</div>
        </div>
      </div>
      <div className="flex items-center justify-between font-medium py-4.5 gap-4 border-y border-neutral">
        <div className="flex items-center gap-4 px-4">
          <Input withLabel={false} label="جستجو در تسک‌ها" />
        </div>
      </div>
    </>
  );
}
