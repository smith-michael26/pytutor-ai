interface HintBoxProps {
  content: string;
}

export default function HintBox({ content }: HintBoxProps) {
  return (
    <div className="flex gap-3 bg-[#FEF3DC] border-l-4 border-[#F4A030] rounded-r-lg p-3 my-3">
      <span className="text-[#F4A030] text-base shrink-0 mt-0.5">💡</span>
      <p className="text-xs text-[#7A4F00] leading-relaxed">{content}</p>
    </div>
  );
}
