import { Topic, TopicStatus } from "@/lib/topics";

interface TopicItemProps {
  topic: Topic;
  onClick: (topic: Topic) => void;
  isActive: boolean;
}

const statusConfig: Record<
  TopicStatus,
  { bg: string; icon: string; iconColor: string }
> = {
  done: { bg: "bg-[#1DB870]", icon: "✓", iconColor: "text-white" },
  active: { bg: "bg-[#2E6DA4]", icon: "●", iconColor: "text-[#4EA8DE]" },
  "in-progress": { bg: "bg-[#F4A030]", icon: "◐", iconColor: "text-white" },
  locked: { bg: "bg-[#6B7280]", icon: "🔒", iconColor: "text-white" },
};

export default function TopicItem({
  topic,
  onClick,
  isActive,
}: TopicItemProps) {
  const config = statusConfig[topic.status];
  const isLocked = topic.status === "locked";

  return (
    <button
      onClick={() => !isLocked && onClick(topic)}
      disabled={isLocked}
      className={`
        w-full flex items-center gap-3 px-3 py-2 text-left transition-all duration-150
        ${
          isActive
            ? "bg-[#2E6DA4] rounded-lg mx-2 w-[calc(100%-16px)]"
            : "hover:bg-[#A8CFE8]/40 rounded-md"
        }
        ${isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <div
        className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center ${config.bg}`}
      >
        <span className={`text-[9px] font-bold ${config.iconColor}`}>
          {config.icon}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p
          className={`text-xs font-medium truncate ${isActive ? "text-white" : "text-[#1A3A5C]"}`}
        >
          {topic.id}. {topic.title}
        </p>
        <p
          className={`text-[10px] truncate ${isActive ? "text-[#A8CFE8]" : "text-[#6B7280]"}`}
        >
          {topic.duration}
        </p>
      </div>
    </button>
  );
}
