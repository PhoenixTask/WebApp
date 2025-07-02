import { forwardRef, SVGProps } from "react";

const SVGIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  ({ ...rest }, ref) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20px"
    height="20px"
    viewBox="0 0 24 24"
    ref={ref}
    {...rest}
    >
      <path
        fill="currentColor"
        d="M3 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0m9 2a2 2 0 1 1 0-4a2 2 0 0 1 0 4m7 0a2 2 0 1 1 0-4a2 2 0 0 1 0 4"
      ></path>
    </svg>
  )
);

SVGIcon.displayName = "More Icon";
export default SVGIcon;
