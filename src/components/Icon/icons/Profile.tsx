import { forwardRef, SVGProps } from "react";

const SVGIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  ({ ...rest }, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 14 14"
      ref={ref}
      {...rest}
    >
      <g
        fill="none"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="7" cy="6.75" r="2.25" />
        <path d="M11 13.5a4.5 4.5 0 0 0-8 0" />
        <path d="M12 10.56a6.25 6.25 0 1 0-9.92 0" />
      </g>
    </svg>
  )
);

SVGIcon.displayName = "Profile Icon";
export default SVGIcon;
