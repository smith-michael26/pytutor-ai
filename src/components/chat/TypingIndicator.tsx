import { useChat } from "@/context/ChatContext";

export default function TypingIndicator() {
  const { isLoading } = useChat();

  return (
    <>
      {isLoading && (
        <div className="flex items-start gap-2">
          <div className="bg-[#7C5CBF] rounded-2xl rounded-tl-sm px-3 py-2">
            <div className="flex gap-1 items-center h-4">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
