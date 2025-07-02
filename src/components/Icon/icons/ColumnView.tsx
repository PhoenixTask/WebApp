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
        d="M7 17h2V7H7zm8-2h2V7h-2zm-4-3h2V7h-2zm-6 9q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zM5 5v14z"
      ></path>
    </svg>
  )
);

SVGIcon.displayName = "ColumnView Icon";
export default SVGIcon;
