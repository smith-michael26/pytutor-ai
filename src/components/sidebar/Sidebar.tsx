"use client";

import { useState } from "react";
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
          <p className="text-[10px] font-semibold text-[#2E6DA4] uppercase tracking-widest">
            Modules
          </p>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto text-[#2E6DA4] hover:text-[#1A3A5C] transition-colors"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isCollapsed ? (
              <path d="M9 18l6-6-6-6" />
            ) : (
              <path d="M15 18l-6-6 6-6" />
            )}
          </svg>
        </button>
      </div>

      {!isCollapsed && (
        <div className="flex flex-col gap-1 py-2 flex-1 overflow-y-auto">
          {topics.map((topic: Topic) => (
            <TopicItem
              key={topic.id}
              topic={topic}
              onClick={onTopicSelect}
              isActive={activeTopic?.id === topic.id} // 👈 now activeTopic is used
            />
          ))}
        </div>
      )}

      {!isCollapsed && <ProgressBar topics={topics} />}
    </aside>
  );
}
