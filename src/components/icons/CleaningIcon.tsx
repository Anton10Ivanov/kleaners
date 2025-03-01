
import { SVGProps } from "react";

export const CleaningIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 5v14" />
    <path d="M21 5v14" />
    <path d="M12 12a4 4 0 0 0 0-8" />
    <path d="M8 12h8" />
    <path d="M12 12a4 4 0 0 1 0 8" />
  </svg>
);
