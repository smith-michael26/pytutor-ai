"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import LessonPanel from "@/components/lesson/lesson-panel/Index";
import ChatPanel from "@/components/chat/ChatPanel";
import EditorPanel from "@/components/editor/EditorPanel";
import { ChatProvider } from "@/context/ChatContext";
import { CurriculumProvider, useCurriculum } from "@/context/CurriculumContext";
import { Panel, Group, Separator } from "react-resizable-panels";

function DashboardPageContent() {
  const {
    topics,
    activeTopic,
    activeLesson,
    loading,
    handleTopicSelect,
    continueToNextTopic,
    resetCourse,
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
      <Group orientation="horizontal" className="flex-1 min-h-0">
        {/* Sidebar */}
        <Panel defaultSize={300} minSize={180} maxSize={300}>
          <Sidebar
            topics={topics}
            onTopicSelect={handleTopicSelect}
            activeTopic={activeTopic}
          />
        </Panel>

        <Separator className="w-1.5 bg-gray-100 hover:bg-[#4EA8DE] transition-colors cursor-col-resize flex flex-col justify-center items-center group">
          <div className="w-0.5 h-8 bg-gray-300 group-hover:bg-[#4EA8DE] rounded-full transition-colors" />
        </Separator>

        {/* Lesson Panel */}
        <Panel defaultSize={40} minSize={700} maxSize={1100}>
          <LessonPanel
            topics={topics}
            topic={activeTopic}
            lesson={activeLesson}
            onTryInEditor={(code) => {
              setEditorCode(code);
              setEditorTrigger((prev) => prev + 1);
            }}
            onAskAI={(question) => setAiPrompt(question)}
            onContinueToNext={continueToNextTopic}
            onResetCourse={resetCourse}
          />
        </Panel>

        <Separator className="w-1.5 bg-gray-100 hover:bg-[#4EA8DE] transition-colors cursor-col-resize flex flex-col justify-center items-center group">
          <div className="w-0.5 h-8 bg-gray-300 group-hover:bg-[#4EA8DE] rounded-full transition-colors" />
        </Separator>

        {/* Chat + Editor stacked vertically */}
        <Panel defaultSize={45} minSize={25}>
          <Group orientation="vertical" style={{ height: "100%" }}>
            {/* Chat */}
            <Panel defaultSize={55} minSize={20}>
              <div className="h-full overflow-hidden">
                <ChatProvider
                  activeTopic={activeTopic}
                  initialMessage={aiPrompt}
                >
                  <ChatPanel />
                </ChatProvider>
              </div>
            </Panel>

            <Separator className="h-1.5 bg-gray-100 hover:bg-[#4EA8DE] transition-colors cursor-row-resize flex justify-center items-center group">
              <div className="w-8 h-0.5 bg-gray-300 group-hover:bg-[#4EA8DE] rounded-full transition-colors" />
            </Separator>

            {/* Editor */}
            <Panel defaultSize={45} minSize={300} maxSize={600}>
              <div className="h-full overflow-hidden">
                <EditorPanel initialCode={editorCode} trigger={editorTrigger} />
              </div>
            </Panel>
          </Group>
        </Panel>
      </Group>
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
