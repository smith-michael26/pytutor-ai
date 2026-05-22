"use client";

import { useLogout } from "@/store/hooks/useLogout";

export default function Navbar() {
  const { logout } = useLogout();

  return (
    <nav className="h-11 bg-[#1A3A5C] flex items-center justify-between px-4 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#4EA8DE]" />
        <span className="text-white text-sm font-medium">PyTutor AI</span>
      </div>

      {/* Right side */}
      <div className="flex items-center">
        <button
          className="text-sm font-medium bg-[#7C5CBF] hover:bg-[#684a9e] text-white px-4 py-1.5 rounded-full cursor-pointer transition-colors"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
