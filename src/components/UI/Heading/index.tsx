import { createElement, ReactNode, FC } from "react";
import { fontWeight } from "../sharedStyles";
import clsx from "clsx";

const TextAlign = {
  right: "text-right",
  center: "text-center",
  left: "text-left",
};

const Size = {
  XS: "text-xl",
  S: "text-2xl",
  M: "text-3xl",
  L: "text-4xl",
  XL: "text-7xl",
};

type Props = {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
  align?: keyof typeof TextAlign;
  size?: keyof typeof Size;
  weight?: keyof typeof fontWeight;
  className?: string;
};

const Heading: FC<Props> = ({
  as,
  children,
  size = "XS",
  weight = "800",
  align = "right",
  className = "",
}) => {
  return createElement(
    as,
    {
      className: clsx(
        Size[size],
        fontWeight[weight],
        TextAlign[align],
        className
      ),
    },
    children
  );
};

export default Heading;
