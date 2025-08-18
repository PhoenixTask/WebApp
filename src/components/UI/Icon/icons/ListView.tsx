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
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <rect width="6" height="6" x="3" y="5" rx="1"></rect>
        <path d="m3 17l2 2l4-4m4-9h8m-8 6h8m-8 6h8"></path>
      </g>
    </svg>
  )
);

SVGIcon.displayName = "ListView Icon";
export default SVGIcon;
