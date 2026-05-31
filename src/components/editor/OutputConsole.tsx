interface OutputLine {
  type: "output" | "error" | "info";
  text: string;
}

interface OutputConsoleProps {
  lines: OutputLine[];
  isRunning: boolean;
}

export type { OutputLine };

export default function OutputConsole({
  lines,
  isRunning,
}: OutputConsoleProps) {
  return (
    <div className="flex flex-col h-full bg-[#0D1E30] overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-[#1A3A5C] shrink-0">
        <div
          className={`w-2 h-2 rounded-full transition-colors ${
            isRunning ? "bg-[#F4A030] animate-pulse" : "bg-[#1DB870]"
          }`}
        />
        <span className="text-[10px] text-[#4EA8DE] font-mono">
          {isRunning ? "Running..." : "Output"}
        </span>
        {lines.length > 0 && !isRunning && (
          <span className="ml-auto text-[10px] text-[#4B5563] font-mono">
            {lines.filter((l) => l.type === "output").length} line(s)
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 font-mono">
        {lines.length === 0 ? (
          <p className="text-[11px] text-[#4B5563]">
            Run your code to see output here
          </p>
        ) : (
          <div className="flex flex-col gap-0.5">
            {lines.map((line, i) => {
              if (line.type === "info") {
                return (
                  <p key={i} className="text-[10px] text-[#4B5563] italic">
                    {line.text}
                  </p>
                );
              }

              if (line.type === "error") {
                return (
                  <p
                    key={i}
                    className="text-[11px] text-[#E84040] leading-relaxed"
                  >
                    {line.text}
                  </p>
                );
              }

              return (
                <p
                  key={i}
                  className="text-[11px] text-[#1DB870] leading-relaxed"
                >
                  {line.text}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
