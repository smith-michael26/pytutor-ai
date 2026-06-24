"use client";

import { useState, useRef, useCallback } from "react";

declare global {
  interface Window {
    loadPyodide: (config: { indexURL: string }) => Promise<any>;
    pyodide: any;
  }
}

export function usePyodide() {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const pyodideRef = useRef<any>(null);

  const init = useCallback(async (): Promise<any> => {
    if (pyodideRef.current) return pyodideRef.current;
    if (window.pyodide) {
      pyodideRef.current = window.pyodide;
      setReady(true);
      return pyodideRef.current;
    }

    setLoading(true);

    return new Promise((resolve) => {
      const finishLoad = async () => {
        try {
          const pyodide = await window.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/",
          });
          window.pyodide = pyodide;
          pyodideRef.current = pyodide;
          setReady(true);
          setLoading(false);
          resolve(pyodide);
        } catch {
          setLoading(false);
          resolve(null);
        }
      };

      const existing = document.getElementById("pyodide-script");

      if (existing) {
        if (window.pyodide) {
          pyodideRef.current = window.pyodide;
          setReady(true);
          setLoading(false);
          resolve(window.pyodide);
        } else {
          existing.addEventListener("load", finishLoad);
        }
        return;
      }

      const script = document.createElement("script");
      script.id = "pyodide-script";
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js";
      script.onload = finishLoad;
      script.onerror = () => {
        setLoading(false);
        resolve(null);
      };
      document.head.appendChild(script);
    });
  }, []);

  const runCode = useCallback(
    async (code: string): Promise<{ output: string; error: string | null }> => {
      const pyodide = pyodideRef.current || (await init());
      if (!pyodide)
        return { output: "", error: "Failed to load Python runtime." };

      try {
        pyodide.runPython(`
import sys, io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
        `);
        try {
          pyodide.runPython(code);
          const stdout = pyodide.runPython("sys.stdout.getvalue()");
          return { output: stdout || "", error: null };
        } catch (err: any) {
          const stderr = pyodide.runPython("sys.stderr.getvalue()");
          return {
            output: "",
            error: stderr || err.message || "Unknown error",
          };
        }
      } catch (err: any) {
        return { output: "", error: err.message || "Unexpected error." };
      }
    },
    [init],
  );

  return { ready, loading, init, runCode };
}
