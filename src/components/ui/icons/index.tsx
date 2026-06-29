import { IconProps, Icons } from "./_types";
import ArrowLeftIcon from "./arrow-left";
import ArrowRightIcon from "./arrow-right";
import EyeCloseIcon from "./eye-close";
import EyeOpenIcon from "./eye-open";
import LoadingIcon from "./loading";
import SendIcon from "./send";
import SnakeIcon from "./snake";
import TrashIcon from "./trash";

interface Props extends IconProps {
  type: Icons;
}

export function Icon({ type, className }: Props) {
  const props = { className };

  switch (type) {
    case "arrow-left":
      return <ArrowLeftIcon {...props} />;

    case "arrow-right":
      return <ArrowRightIcon {...props} />;

    case "loading":
      return <LoadingIcon {...props} />;

    case "send":
      return <SendIcon {...props} />;

    case "snake":
      return <SnakeIcon {...props} />;

    case "trash":
      return <TrashIcon {...props} />;

    case "eye-close":
      return <EyeCloseIcon {...props} />;

    case "eye-open":
      return <EyeOpenIcon {...props} />;

    default:
      return null;
  }
}
