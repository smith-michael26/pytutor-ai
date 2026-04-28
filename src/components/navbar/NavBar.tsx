export default function Navbar() {
  return (
    <nav className="h-11 bg-[#1A3A5C] flex items-center justify-between px-4 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#4EA8DE]" />
        <span className="text-white text-sm font-medium">PyTutor AI</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <span className="text-[11px] bg-[#7C5CBF] text-white px-3 py-1 rounded-full">
          Quiz mode
        </span>
        <div className="w-7 h-7 rounded-full bg-[#2E6DA4] flex items-center justify-center text-white text-xs font-medium">
          AB
        </div>
      </div>
    </nav>
  );
}
