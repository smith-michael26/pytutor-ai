import { Topic } from "@/lib/topics";

interface DeleteChatModalProps {
  activeTopic: Topic | null;
  setShowDeleteConfirm: (show: boolean) => void;
  handleConfirmDelete: () => void;
}

export default function DeleteChatModal({
  activeTopic,
  setShowDeleteConfirm,
  handleConfirmDelete,
}: DeleteChatModalProps) {
  return (
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl p-5 w-full max-w-xs animate-in zoom-in-95 duration-200">
        <h3 className="text-base font-bold text-[#1A3A5C] mb-2">
          Clear Conversation?
        </h3>
        <p className="text-xs text-gray-500 mb-6 leading-relaxed">
          This will permanently delete all messages for{" "}
          <strong className="text-gray-700">{activeTopic?.title}</strong>. This
          action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowDeleteConfirm(false)}
            className="text-xs font-medium hover:bg-gray-500/20 rounded-lg text-gray-800 transition-colors px-3 py-2 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            className="text-xs font-medium bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors shadow-sm cursor-pointer"
          >
            Delete Chat
          </button>
        </div>
      </div>
    </div>
  );
}
