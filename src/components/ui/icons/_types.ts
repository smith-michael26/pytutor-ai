export interface IconProps {
  className?: string;
}

export const Icons = {
  ArrowLeft: "arrow-left",
  ArrowRight: "arrow-right",
  Loading: "loading",
  Send: "send",
  Trash: "trash",
};

export type Icons = (typeof Icons)[keyof typeof Icons];
