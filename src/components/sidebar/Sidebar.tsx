"use client";

import { useState } from "react";
import { Topic } from "@/lib/topics";
import TopicItem from "./TopicItem";
import ProgressBar from "./Progressbar";
import ArrowRightIcon from "../ui/icons/arrow-right";
import ArrowLeftIcon from "../ui/icons/arrow-left";

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
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`
        flex flex-col bg-[#D6EAF8] border-r border-[#A8CFE8]
        transition-all duration-300 shrink-0
        ${isCollapsed ? "w-12" : "w-72"}
      `}
    >
      <div className="flex items-center justify-between px-3 py-3 border-b border-[#A8CFE8]">
        {!isCollapsed && (
          <p className="text-[11px] font-semibold text-[#2E6DA4] uppercase tracking-widest">
            Modules
          </p>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto text-[#2E6DA4] hover:text-[#1A3A5C] transition-colors cursor-pointer p-1 rounded"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ArrowRightIcon className="w-4 h-4" />
          ) : (
            <ArrowLeftIcon className="w-4 h-4" />
          )}
        </button>
      </div>

      {!isCollapsed && (
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
      )}

      {!isCollapsed && <ProgressBar topics={topics} />}
    </aside>
  );
}
