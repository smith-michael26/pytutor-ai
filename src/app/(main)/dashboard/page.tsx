"use client";

import { useState } from "react";
import { Topic, topics } from "@/lib/topics";
import Sidebar from "@/components/sidebar/Sidebar";
import LessonPanel from "@/components/lesson/LessonPanel";
import ChatPanel from "@/components/chat/ChatPanel";
import EditorPanel from "@/components/editor/EditorPanel";
import { ChatProvider } from "@/context/ChatContext";

import { Panel, Group, Separator } from "react-resizable-panels";

export default function DashboardPage() {
  const [activeTopic, setActiveTopic] = useState<Topic | null>(
    topics.find((t) => t.status === "active") || null,
  );
  const [aiPrompt, setAiPrompt] = useState<string>("");
  const [editorCode, setEditorCode] = useState<string>("");

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <Sidebar onTopicSelect={setActiveTopic} activeTopic={activeTopic} />

      <div className="flex-1 overflow-hidden">
        <Group orientation="horizontal">
          <Panel defaultSize={50} minSize={30}>
            <div className="h-full overflow-hidden">
              <LessonPanel
                topic={activeTopic}
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
