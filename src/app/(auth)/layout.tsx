"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-md border border-subtle p-8 sm:p-10">
        {/* Logo / Header Section */}
        <div className="flex flex-col items-center justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet text-white font-mono font-bold text-lg shadow-sm">
              Py
            </div>
            <span className="text-2xl font-extrabold text-navy tracking-tight">
              PyTutor AI
            </span>
          </Link>
          <p className="text-slate text-sm">
            {isLogin ? "Welcome back, future dev" : "Start your Python journey"}
          </p>
        </div>

        {/* The Login or Register Form is injected right here */}
        {children}

        {/* Dynamic Footer Section */}
        <div className="mt-8 pt-6 border-t border-mist text-center text-sm text-slate">
          {isLogin ? (
            <p>
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-cobalt hover:text-navy transition-colors"
              >
                Create one
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-cobalt hover:text-navy transition-colors"
              >
                Log in
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
