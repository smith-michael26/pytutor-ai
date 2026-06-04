import { IconProps } from "../_types";

export default function ArrowRightIcon({ className }: IconProps) {
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
        d="m9.005 4l8 8l-8 8L7 18l6.005-6L7 6z"
      />
    </svg>
  );
}
