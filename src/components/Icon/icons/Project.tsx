import { forwardRef, SVGProps } from "react";

const SVGIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  ({ ...rest }, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
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
        <path
          strokeDasharray="64"
          strokeDashoffset="64"
          d="M13.5 3l5.5 5.5v11.5c0 0.55 -0.45 1 -1 1h-12c-0.55 0 -1 -0.45 -1 -1v-16c0 -0.55 0.45 -1 1 -1Z"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.6s"
            values="64;0"
          ></animate>
        </path>
        <path d="M14.5 3.5l2.25 2.25l2.25 2.25z" opacity="0">
          <animate
            fill="freeze"
            attributeName="d"
            begin="0.6s"
            dur="0.2s"
            values="M14.5 3.5l2.25 2.25l2.25 2.25z;M14.5 3.5l0 4.5l4.5 0z"
          ></animate>
          <set fill="freeze" attributeName="opacity" begin="0.6s" to="1"></set>
        </path>
      </g>
    </svg>
  )
);

SVGIcon.displayName = "Project Icon";
export default SVGIcon;
