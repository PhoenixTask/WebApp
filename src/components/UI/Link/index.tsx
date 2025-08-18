import { ReactNode } from "react";
import RouterLink from "next/link";
import { fontWeight, fontSize } from "../sharedStyles";
import clsx from "clsx";

type Props = {
  target?: "_self" | "_blank" | "_parent" | "_top";
  className?: string;
  asChild?: boolean;
  children: ReactNode;
  to?: string;
  weight?: keyof typeof fontWeight;
  underline?: boolean;
  textSize?: keyof typeof fontSize;
  onClick?: () => void;
};

const Link = ({
  asChild = false,
  children,
  to = "",
  underline = false,
  className = "",
  weight = "400",
  textSize = "XS",
  ...rest
}: Props) => {
  return (
    <RouterLink
      href={to}
      className={clsx(
        !asChild && "text-base-content hover:text-neutral transition-colors duration-300",
        underline && "underline underline-offset-8",
        fontWeight[weight],
        fontSize[textSize],
        className
      )}
      {...rest}
    >
      {children}
    </RouterLink>
  );
};

export default Link;
