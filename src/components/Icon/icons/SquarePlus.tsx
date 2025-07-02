import { forwardRef, SVGProps } from "react";

const SVGIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  ({ ...rest }, ref) => (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.5 20H6.5C5.395 20 4.5 19.105 4.5 18V6C4.5 4.895 5.395 4 6.5 4H18.5C19.605 4 20.5 4.895 20.5 6V18C20.5 19.105 19.605 20 18.5 20Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 8V16"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 12H8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
);

SVGIcon.displayName = "SquarePlus Icon";
export default SVGIcon;
