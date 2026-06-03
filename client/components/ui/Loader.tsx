import { cn } from "@/lib/utils";

export const Loader = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex space-x-1 items-center h-5", className)}>
      <div className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full animate-bounce"></div>
    </div>
  );
};
