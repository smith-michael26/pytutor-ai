import { IconProps } from "../_types";

export default function ArrowLeftIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="m15 4l2 2l-6 6l6 6l-2 2l-8-8z"
      />
    </svg>
  );
}
