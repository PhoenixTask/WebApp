import { SVGProps } from "react";
import * as IconMap from "./icons";

export type IconName = keyof typeof IconMap;

type IconProps = SVGProps<SVGSVGElement> & {
  iconName: IconName;
  fallback?: React.ReactNode;
};

export default function Icon({
  iconName,
  fallback = null,
  ...rest
}: IconProps) {
  const Component = IconMap[iconName];

  if (!Component) return fallback;

  return <Component {...rest} />;
}
