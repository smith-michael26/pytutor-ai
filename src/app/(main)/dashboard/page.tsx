"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import LessonPanel from "@/components/lesson/lesson-panel/Index";
import ChatPanel from "@/components/chat/ChatPanel";
import EditorPanel from "@/components/editor/EditorPanel";
import { ChatProvider } from "@/context/ChatContext";
import { CurriculumProvider, useCurriculum } from "@/context/CurriculumContext";

function DashboardPageContent() {
  const {
    topics,
    activeTopic,
    activeLesson,
    loading,
    handleTopicSelect,
    continueToNextTopic,
  } = useCurriculum();

  const [aiPrompt, setAiPrompt] = useState<string>("");
  const [editorCode, setEditorCode] = useState<string>("");
  const [editorTrigger, setEditorTrigger] = useState<number>(0);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#2E6DA4] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[#6B7280]">Loading curriculum...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar
        topics={topics}
        onTopicSelect={handleTopicSelect}
        activeTopic={activeTopic}
      />

      <div className="flex-1 overflow-hidden">
        <LessonPanel
          topic={activeTopic}
          lesson={activeLesson}
          onTryInEditor={(code) => {
            setEditorCode(code);
            setEditorTrigger((prev) => prev + 1);
          }}
          onAskAI={(question) => setAiPrompt(question)}
          onContinueToNext={continueToNextTopic}
        />
      </div>

      <div className="w-160 shrink-0 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <ChatProvider activeTopic={activeTopic} initialMessage={aiPrompt}>
            <ChatPanel />
          </ChatProvider>
        </div>

        <div className="h-96 shrink-0 border-t border-gray-200">
          <EditorPanel initialCode={editorCode} trigger={editorTrigger} />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <CurriculumProvider>
      <DashboardPageContent />
    </CurriculumProvider>
  );
}
