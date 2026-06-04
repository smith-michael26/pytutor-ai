import { Topic } from "@/lib/topics";
import TrashIcon from "../ui/icons/trash";

interface DeleteModalProps {
  activeTopic: Topic | null;
  onSetShowDeleteModal: (show: boolean) => void;
  onConfirmDelete: () => void;
}

export default function DeleteModal({
  activeTopic,
  onSetShowDeleteModal,
  onConfirmDelete,
}: DeleteModalProps) {
  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={() => onSetShowDeleteModal(false)}
    >
      <div className="bg-white rounded-xl shadow-lg p-5 mx-4 w-full max-w-xs">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <TrashIcon className="text-[#E84040]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1A3A5C]">
              Clear conversation?
            </p>
            <p className="text-xs text-[#6B7280] mt-0.5">
              {activeTopic
                ? `All messages for "${activeTopic.title}" will be permanently deleted.`
                : "This action cannot be undone."}
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onSetShowDeleteModal(false)}
            className="flex-1 text-xs border border-gray-200 text-[#6B7280] py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirmDelete}
            className="flex-1 text-xs bg-[#E84040] text-white py-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
