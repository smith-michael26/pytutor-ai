"use client";

import { useState } from "react";
import { Panel, Group, Separator } from "react-resizable-panels";
import { CurriculumProvider, useCurriculum } from "@/context/CurriculumContext";
import { ChatProvider } from "@/context/ChatContext";
import Sidebar from "@/components/sidebar/Sidebar";
import ChatPanel from "@/components/chat/ChatPanel";
import EditorPanel from "@/components/editor/EditorPanel";
import LessonPanel from "@/components/lesson/lesson-panel";

function DashboardContent() {
  const { topics, activeTopic, activeLesson, loading, handleTopicSelect } =
    useCurriculum();

  const [aiPrompt, setAiPrompt] = useState<string>("");
  const [editorCode, setEditorCode] = useState<string>("");

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
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <Sidebar
        topics={topics}
        onTopicSelect={handleTopicSelect}
        activeTopic={activeTopic}
      />

      <div className="flex-1 overflow-hidden">
        <Group orientation="horizontal">
          <Panel defaultSize={50} minSize={30}>
            <div className="h-full overflow-hidden">
              <LessonPanel
                topic={activeTopic}
                lesson={activeLesson}
                onTryInEditor={(code) => setEditorCode(code)}
                onAskAI={(question) => setAiPrompt(question)}
              />
            </div>
          </Panel>

          <Separator className="w-1.5 bg-gray-100 hover:bg-[#4EA8DE] transition-colors cursor-col-resize flex flex-col justify-center items-center group">
            <div className="w-0.5 h-8 bg-gray-300 group-hover:bg-white rounded-full transition-colors" />
          </Separator>

          <Panel defaultSize={50} minSize={30}>
            <Group orientation="vertical">
              <Panel defaultSize={50} minSize={20}>
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
                <div className="w-8 h-0.5 bg-gray-300 group-hover:bg-white rounded-full transition-colors" />
              </Separator>

              <Panel defaultSize={50} minSize={20}>
                <div className="h-full overflow-hidden">
                  <EditorPanel initialCode={editorCode} />
                </div>
              </Panel>
            </Group>
          </Panel>
        </Group>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <CurriculumProvider>
      <DashboardContent />
    </CurriculumProvider>
  );
}
