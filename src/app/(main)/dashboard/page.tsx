"use client";

import { useState } from "react";
import { Topic, topics } from "@/lib/topics";
import Sidebar from "@/components/sidebar/Sidebar";
import LessonPanel from "@/components/lesson/LessonPanel";
import ChatPanel from "@/components/chat/ChatPanel";
import EditorPanel from "@/components/editor/EditorPanel";

export default function DashboardPage() {
  const [activeTopic, setActiveTopic] = useState<Topic | null>(
    topics.find((t) => t.status === "active") || null,
  );
  const [aiPrompt, setAiPrompt] = useState<string>("");
  const [editorCode, setEditorCode] = useState<string>("");

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* 1. Sidebar */}
      <Sidebar onTopicSelect={setActiveTopic} activeTopic={activeTopic} />

      {/* 2. Lesson Panel */}
      <div className="flex-1 overflow-hidden">
        <LessonPanel
          topic={activeTopic}
          onTryInEditor={(code) => setEditorCode(code)}
          onAskAI={(question) => setAiPrompt(question)}
        />
      </div>

      {/* 3. Right column — Chat on top, Editor below */}
      <div className="w-160 shrink-0 flex flex-col overflow-hidden">
        {/* Chat Panel — top half */}
        <div className="flex-1 overflow-hidden">
          <ChatPanel activeTopic={activeTopic} initialMessage={aiPrompt} />
        </div>

        {/* Editor Panel — bottom half */}
        <div className="h-96 shrink-0 border-t border-gray-200">
          <EditorPanel initialCode={editorCode} />
        </div>
      </div>
    </div>
  );
}
