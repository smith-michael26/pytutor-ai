"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import CodeEditor from "./CodeEditor";
import OutputConsole, { OutputLine } from "./OutputConsole";

interface EditorPanelProps {
  initialCode?: string;
}

const DEFAULT_CODE = `# Write your Python code here\nprint("Hello, World!")\n`;

declare global {
  interface Window {
    loadPyodide: (config: { indexURL: string }) => Promise<any>;
    pyodide: any;
  }
}

export default function EditorPanel({ initialCode }: EditorPanelProps) {
  const [code, setCode] = useState(initialCode || DEFAULT_CODE);
  const [outputLines, setOutputLines] = useState<OutputLine[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [pyodideLoading, setPyodideLoading] = useState(false);
  const pyodideRef = useRef<any>(null);
  const monacoEditorRef = useRef<any>(null);

  useEffect(() => {
    if (initialCode && initialCode.trim() !== "") {
      setCode(initialCode);
    }
  }, [initialCode]);

  const initPyodide = useCallback(async (): Promise<boolean> => {
    if (pyodideRef.current) return true;

    setPyodideLoading(true);
    setOutputLines([
      { type: "info", text: "Loading Python runtime... (first time only)" },
    ]);

    return new Promise((resolve) => {
      if (window.loadPyodide) {
        window
          .loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/",
          })
          .then((pyodide: any) => {
            pyodideRef.current = pyodide;
            setPyodideReady(true);
            setPyodideLoading(false);
            resolve(true);
          })
          .catch(() => {
            setPyodideLoading(false);
            setOutputLines([
              { type: "error", text: "Failed to initialise Python runtime." },
            ]);
            resolve(false);
          });
        return;
      }

      const script = document.createElement("script");
      script.id = "pyodide-script";
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js";

      script.onload = async () => {
        try {
          const pyodide = await window.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/",
          });
          pyodideRef.current = pyodide;
          setPyodideReady(true);
          setPyodideLoading(false);
          resolve(true);
        } catch {
          setPyodideLoading(false);
          setOutputLines([
            {
              type: "error",
              text: "Failed to load Python runtime. Please refresh.",
            },
          ]);
          resolve(false);
        }
      };

      script.onerror = () => {
        setPyodideLoading(false);
        setOutputLines([
          {
            type: "error",
            text: "Failed to load Pyodide. Check your internet connection.",
          },
        ]);
        resolve(false);
      };

      document.head.appendChild(script);
    });
  }, []);

  const runCode = useCallback(async () => {
    if (isRunning || pyodideLoading) return;

    setIsRunning(true);

    if (!pyodideRef.current) {
      const loaded = await initPyodide();
      if (!loaded) {
        setIsRunning(false);
        return;
      }
    }

    const pyodide = pyodideRef.current;
    const outputBuffer: OutputLine[] = [];

    try {
      pyodide.runPython(`
import sys, io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
      `);

      let hasError = false;

      try {
        pyodide.runPython(code);
      } catch (err: any) {
        hasError = true;
        const stderr = pyodide.runPython("sys.stderr.getvalue()");
        const errorLines = (stderr || err.message || "Unknown error")
          .split("\n")
          .filter((l: string) => l.trim());
        errorLines.forEach((line: string) =>
          outputBuffer.push({ type: "error", text: line }),
        );
      }

      if (!hasError) {
        const stdout = pyodide.runPython("sys.stdout.getvalue()");
        if (stdout) {
          stdout
            .split("\n")
            .filter((l: string) => l !== "")
            .forEach((line: string) =>
              outputBuffer.push({ type: "output", text: line }),
            );
        } else {
          outputBuffer.push({ type: "info", text: "Code ran with no output." });
        }
      }

      outputBuffer.push({ type: "info", text: "Process finished." });
    } catch (err: any) {
      outputBuffer.push({
        type: "error",
        text: err.message || "Unexpected error.",
      });
    } finally {
      setOutputLines(outputBuffer);
      setIsRunning(false);
    }
  }, [code, isRunning, pyodideLoading, initPyodide]);

  const clearOutput = () => setOutputLines([]);

  const resetCode = () => {
    setCode(DEFAULT_CODE);
    setOutputLines([]);
    if (monacoEditorRef.current) {
      monacoEditorRef.current.setValue(DEFAULT_CODE);
    }
  };
  return (
    <div className="flex flex-col h-full border-l border-gray-100 overflow-hidden bg-[#1F2937]">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#1F2937] border-b border-[#2E3A4A] shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E84040]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#F4A030]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#1DB870]" />
          <span className="text-[10px] text-[#6B7280] font-mono ml-2">
            main.py
          </span>

          {pyodideLoading && (
            <span className="text-[10px] text-[#F4A030] font-mono animate-pulse">
              · Loading Python...
            </span>
          )}
          {pyodideReady && !pyodideLoading && (
            <span className="text-[10px] text-[#1DB870] font-mono">
              · Python ready
            </span>
          )}
          {!pyodideReady && !pyodideLoading && (
            <span className="text-[10px] text-[#6B7280] font-mono">
              · Click Run to start
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={clearOutput}
            className="text-[10px] text-[#6B7280] hover:text-white transition-colors font-mono"
          >
            Clear
          </button>
          <button
            onClick={resetCode}
            className="text-[10px] text-[#6B7280] hover:text-white transition-colors font-mono"
          >
            Reset
          </button>
          <button
            onClick={runCode}
            disabled={isRunning || pyodideLoading}
            className={`
              flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium
              transition-all duration-150
              ${
                !isRunning && !pyodideLoading
                  ? "bg-[#1DB870] text-white hover:bg-[#17a362] cursor-pointer"
                  : "bg-[#4B5563] text-[#9CA3AF] cursor-not-allowed"
              }
            `}
          >
            {isRunning || pyodideLoading ? (
              <>
                <svg
                  className="animate-spin w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                {pyodideLoading ? "Loading..." : "Running"}
              </>
            ) : (
              <>
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3 h-3"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Run
              </>
            )}
          </button>
        </div>
      </div>

      <div className="overflow-hidden" style={{ height: "60%" }}>
        <CodeEditor
          value={code}
          onChange={setCode}
          onEditorMount={(editor) => {
            monacoEditorRef.current = editor;
          }}
        />
      </div>

      <div
        className="overflow-hidden border-t border-[#1A3A5C]"
        style={{ height: "40%" }}
      >
        <OutputConsole lines={outputLines} isRunning={isRunning} />
      </div>
    </div>
  );
}
