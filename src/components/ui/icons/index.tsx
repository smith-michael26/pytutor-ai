import { IconProps, Icons } from "./_types";
import ArrowLeftIcon from "./arrow-left";
import ArrowRightIcon from "./arrow-right";
import LoadingIcon from "./loading";
import SendIcon from "./send";
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

    case "loading":
      return <LoadingIcon {...props} />;

    case "send":
      return <SendIcon {...props} />;

    case "trash":
      return <TrashIcon {...props} />;

    default:
      return null;
  }
}
