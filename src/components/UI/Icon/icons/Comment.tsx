import { forwardRef, SVGProps } from "react";

const SVGIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  ({ ...rest }, ref) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#AEAEAE"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3.99658C7.02793 3.99658 2.99625 7.35666 2.99625 11.4968C3.0714 13.9951 4.44925 16.2717 6.62776 17.497C6.41136 18.085 6.11046 18.6384 5.73453 19.1398C5.52703 19.4427 5.53217 19.8433 5.74735 20.1409C5.96254 20.4384 6.3414 20.5687 6.69409 20.4665C7.89692 20.1163 9.02907 19.558 10.0392 18.817C10.6857 18.9382 11.3422 18.9985 12 18.997C16.9721 18.997 21.0037 15.6369 21.0037 11.4968C21.0037 7.35667 16.9721 3.99658 12 3.99658Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.99875 9.99923H15.0012"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.99875 13.0007H12"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
);

SVGIcon.displayName = "Comment Icon";
export default SVGIcon;
