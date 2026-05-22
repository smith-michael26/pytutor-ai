import { topics } from "@/lib/topics";

export default function ProgressBar() {
  const completed = topics.filter((t) => t.status === "done").length;
  const percentage = Math.round((completed / topics.length) * 100);

  return (
    <div className="p-3 border-t border-[#A8CFE8] mt-auto">
      {/* Label row */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-medium text-[#1A3A5C]">Your progress</p>
        <span className="text-xs font-semibold text-[#2E6DA4]">
          {percentage}%
        </span>
      </div>

      {/* Bar */}
      <div className="h-2 bg-[#A8CFE8] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#2E6DA4] rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Sub label */}
      <p className="text-[10px] text-[#6B7280] mt-1">
        {completed} of {topics.length} topics completed
      </p>
    </div>
  );
}
