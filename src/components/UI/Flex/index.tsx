import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

const FlexGap = {
  XS: "gap-2",
  S: "gap-4",
  M: "gap-6",
  L: "gap-8",
  XL: "gap-10",
};

const FlexDirection = {
  row: "flex-row",
  row_reverse: "flex-row-reverse",
  col: "flex-col",
  col_reverse: "flex-col-reverse",
};

const justifyMap = {
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const alignMap = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  baseline: "items-baseline",
  stretch: "items-stretch",
  between: "items-between",
};

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  direction?: keyof typeof FlexDirection;
  gap?: keyof typeof FlexGap;
  justifyContent?: "start" | "end" | "center" | "between" | "around" | "evenly";
  alignItems?: "start" | "end" | "center" | "baseline" | "stretch" | "between";
}

const Flex = ({
  children,
  className = "w-full",
  justifyContent = "start",
  alignItems = "start",
  direction = "row",
  gap = "XS",
  ...rest
}: Props) => {
  return (
    <div
      className={clsx(
        "flex",
        FlexGap[gap],
        FlexDirection[direction],
        justifyMap[justifyContent],
        alignMap[alignItems],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Flex;
