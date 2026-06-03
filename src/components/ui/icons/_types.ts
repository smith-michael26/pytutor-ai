export interface IconProps {
  className?: string;
}

export const Icons = {
  Loading: "loading",
  Send: "send",
  Trash: "trash",
};

export type Icons = (typeof Icons)[keyof typeof Icons];
