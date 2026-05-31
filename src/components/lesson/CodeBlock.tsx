"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

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
            {copied ? "Copied! ✓" : "Copy"}
          </button>
        </div>
      </div>

      <SyntaxHighlighter
        language="python"
        style={vscDarkPlus}
        showLineNumbers
        lineNumberStyle={{
          color: "#4B5563",
          fontSize: "11px",
          minWidth: "2em",
          paddingRight: "12px",
        }}
        customStyle={{
          margin: 0,
          padding: "12px 16px",
          fontSize: "12px",
          lineHeight: "1.7",
          background: "#1F2937",
          borderRadius: 0,
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
