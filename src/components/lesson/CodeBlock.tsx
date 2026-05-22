import { useState } from "react";

interface CodeBlockProps {
  code: string;
  onTryInEditor?: (code: string) => void;
}

export default function CodeBlock({ code, onTryInEditor }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-lg overflow-hidden border border-[#2E3A4A]">
      {/* Code block header */}
      <div className="bg-[#1F2937] px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E84040]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#F4A030]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#1DB870]" />
          <span className="text-[10px] text-[#6B7280] ml-2 font-mono">
            python
          </span>
        </div>
        <div className="flex items-center gap-2">
          {onTryInEditor && (
            <button
              onClick={() => onTryInEditor(code)}
              className="text-[10px] text-[#4EA8DE] hover:text-white transition-colors"
            >
              Try in editor →
            </button>
          )}
          <button
            onClick={handleCopy}
            className="text-[10px] text-[#6B7280] hover:text-white transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Code content */}
      <div className="bg-[#1F2937] px-4 py-3 overflow-x-auto">
        <pre className="text-xs font-mono leading-relaxed">
          {code.split("\n").map((line, i) => (
            <div key={i} className="flex gap-4">
              <span className="text-[#4B5563] select-none w-4 text-right shrink-0">
                {i + 1}
              </span>
              <span className="text-[#F1F5F9]">{line}</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
