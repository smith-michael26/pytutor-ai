import { TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lesson } from "@/lib/lessons";
import { Topic } from "@/lib/topics";

interface NoteTabProps {
  topic?: Topic | null;
  lesson?: Lesson | null;
}

export default function NoteTab({}: NoteTabProps) {
  return (
    <TabsContent value="notes" className="flex-1 overflow-hidden mt-0">
      <ScrollArea className="h-full">
        <div className="px-5 py-4">
          <p className="text-sm font-medium text-[#1A3A5C] mb-3">Your Notes</p>
          <textarea
            placeholder="Write your notes for this topic here..."
            className="w-full h-64 text-sm text-[#374151] border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#4EA8DE] placeholder:text-[#9CA3AF]"
          />
          <button className="mt-2 text-xs bg-[#2E6DA4] text-white px-4 py-2 rounded-lg hover:bg-[#1A3A5C] transition-colors">
            Save Notes
          </button>
        </div>
      </ScrollArea>
    </TabsContent>
  );
}
