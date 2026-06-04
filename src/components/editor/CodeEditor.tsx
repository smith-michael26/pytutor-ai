"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-[#1F2937]">
      <p className="text-xs text-[#6B7280] font-mono">Loading editor...</p>
    </div>
  ),
});

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onEditorMount?: (editor: any) => void;
}

export default function CodeEditor({
  value,
  onChange,
  onEditorMount,
}: CodeEditorProps) {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;

    editor.focus();

    if (onEditorMount) {
      onEditorMount(editor);
    }
  };

  return (
    <div className="flex-1 overflow-hidden">
      <MonacoEditor
        height="100%"
        language="python"
        theme="vs-dark"
        value={value}
        onChange={(val) => onChange(val || "")}
        onMount={handleEditorDidMount}
        options={{
          fontSize: 13,
          fontFamily: "'Fira Code', 'Courier New', monospace",
          fontLigatures: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          lineNumbers: "on",
          lineNumbersMinChars: 3,
          renderLineHighlight: "line",
          wordWrap: "on",
          tabSize: 4,
          insertSpaces: true,
          autoIndent: "full",
          formatOnPaste: true,
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          padding: { top: 12, bottom: 12 },
          scrollbar: {
            verticalScrollbarSize: 6,
            horizontalScrollbarSize: 6,
          },
        }}
      />
    </div>
  );
}
