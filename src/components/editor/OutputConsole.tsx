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
      {/* Console header */}
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-[#1A3A5C] flex-shrink-0">
        <div
          className={`w-2 h-2 rounded-full ${isRunning ? "bg-[#F4A030] animate-pulse" : "bg-[#1DB870]"}`}
        />
        <span className="text-[10px] text-[#4EA8DE] font-mono">
          {isRunning ? "Running..." : "Output"}
        </span>
        {lines.length > 0 && (
          <span className="ml-auto text-[10px] text-[#4B5563] font-mono">
            {lines.length} line{lines.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Console output */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        {lines.length === 0 ? (
          <p className="text-[11px] text-[#4B5563] font-mono mt-1">
            {"// Run your code to see output here"}
          </p>
        ) : (
          <div className="flex flex-col gap-0.5">
            {lines.map((line, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-[#4B5563] font-mono text-[10px] flex-shrink-0 mt-0.5">
                  {">"}
                </span>
                <span
                  className={`font-mono text-[11px] leading-relaxed break-all ${
                    line.type === "error"
                      ? "text-[#E84040]"
                      : line.type === "info"
                        ? "text-[#4EA8DE]"
                        : "text-[#1DB870]"
                  }`}
                >
                  {line.text}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
