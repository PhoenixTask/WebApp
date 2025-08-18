import { forwardRef, SVGProps } from "react";

const SVGIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  ({ ...rest }, ref) => (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      stroke="#BDC0C6"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...rest}
    >
      <path
        d="M10.1373 7.24158L7.46793 9.90935L5.86313 8.30936"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="1.99789"
        y="2.49768"
        width="12.005"
        height="12.005"
        rx="3.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
);

SVGIcon.displayName = "CheckBox Icon";
export default SVGIcon;
