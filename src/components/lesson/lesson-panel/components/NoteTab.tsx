"use client";

import { TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotes } from "@/context/NoteContext";

export default function NoteTab() {
  const {
    content,
    isLoading,
    isSaving,
    isDirty,
    saveMessage,
    handleTextChange,
    saveNotes,
  } = useNotes();

  return (
    <TabsContent value="notes" className="flex-1 overflow-hidden mt-0">
      <ScrollArea className="h-full">
        <div className="px-5 py-4">
          <div className="flex justify-between items-end mb-3">
            <p className="text-sm font-medium text-[#1A3A5C]">Your Notes</p>

            <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
              {isDirty && (
                <span className="text-[#E59866] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#E59866] rounded-full animate-pulse"></span>
                  Unsaved changes
                </span>
              )}
              <span>{content.length} chars</span>
            </div>
          </div>

          <div className="relative">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50 rounded-lg z-10 border border-gray-200">
                <p className="text-xs text-gray-500 animate-pulse">
                  Loading notes...
                </p>
              </div>
            ) : null}

            <textarea
              value={content}
              onChange={handleTextChange}
              disabled={isLoading}
              placeholder="Write your notes for this topic here..."
              className="w-full h-64 text-sm text-[#374151] border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#4EA8DE] placeholder:text-[#9CA3AF] disabled:opacity-50"
            />
          </div>

          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={saveNotes}
              disabled={!isDirty || isSaving || isLoading}
              className="text-xs font-medium bg-[#2E6DA4] text-white px-4 py-2 rounded-lg hover:bg-[#1A3A5C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-25 cursor-pointer"
            >
              {isSaving ? "Saving..." : "Save Notes"}
            </button>

            {saveMessage && (
              <span className="text-xs font-medium text-[#1DB870] animate-in fade-in">
                {saveMessage}
              </span>
            )}
          </div>
        </div>
      </ScrollArea>
    </TabsContent>
  );
}
