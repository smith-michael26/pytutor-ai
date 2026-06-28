"use client";

import { Topic } from "@/lib/topics";
import TopicItem from "./TopicItem";
import ProgressBar from "./Progressbar";

interface SidebarProps {
  topics: Topic[];
  onTopicSelect: (topic: Topic) => void;
  activeTopic: Topic | null;
}

export default function Sidebar({
  topics,
  onTopicSelect,
  activeTopic,
}: SidebarProps) {
  return (
    <aside className="flex flex-col h-full bg-[#D6EAF8] border-r border-[#A8CFE8] overflow-hidden">
      <div className="flex items-center justify-between px-3 py-3 border-b border-[#A8CFE8]">
        <p className="text-[11px] font-semibold text-[#2E6DA4] uppercase tracking-widest">
          Modules
        </p>
      </div>

      <div className="flex flex-col gap-1 py-2 flex-1 overflow-y-auto">
        {topics.map((topic) => (
          <TopicItem
            key={topic.id}
            topic={topic}
            onClick={onTopicSelect}
            isActive={activeTopic?.id === topic.id}
          />
        ))}
      </div>

      <ProgressBar topics={topics} />
    </aside>
  );
}
