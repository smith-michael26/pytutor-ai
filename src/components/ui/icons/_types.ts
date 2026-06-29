export interface IconProps {
  className?: string;
}

export const Icons = {
  ArrowLeft: "arrow-left",
  ArrowRight: "arrow-right",
  EyeClose: "eye-close",
  EyeOpen: "eye-open",
  Loading: "loading",
  Send: "send",
  Snake: "snake",
  Trash: "trash",
};

export type Icons = (typeof Icons)[keyof typeof Icons];
