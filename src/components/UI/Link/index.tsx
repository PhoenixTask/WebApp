import { ReactNode } from "react";
import NextLink from "next/link";
import { Link as I18nLink, routeType } from "@/i18n/routing";
import { fontWeight, fontSize } from "../sharedStyles";
import clsx from "clsx";

type Props = {
  target?: "_self" | "_blank" | "_parent" | "_top";
  className?: string;
  asChild?: boolean;
  children: ReactNode;
  weight?: keyof typeof fontWeight;
  underline?: boolean;
  textSize?: keyof typeof fontSize;
  onClick?: () => void;
} & ({ i18n?: true; to: routeType } | { i18n?: false; to: string });

const Link = ({
  asChild = false,
  children,
  to,
  underline = false,
  className = "",
  weight = "400",
  textSize = "XS",
  i18n = false,
  ...rest
}: Props) => {
  if (i18n) {
    return (
      <I18nLink
        href={to as routeType}
        className={clsx(
          !asChild &&
            "text-base-content hover:text-neutral transition-colors duration-300",
          underline && "underline underline-offset-8",
          fontWeight[weight],
          fontSize[textSize],
          className
        )}
        {...rest}
      >
        {children}
      </I18nLink>
    );
  }

  return (
    <NextLink
      href={to as string}
      className={clsx(
        !asChild &&
          "text-base-content hover:text-neutral transition-colors duration-300",
        underline && "underline underline-offset-8",
        fontWeight[weight],
        fontSize[textSize],
        className
      )}
      {...rest}
    >
      {children}
    </NextLink>
  );
};

export default Link;
