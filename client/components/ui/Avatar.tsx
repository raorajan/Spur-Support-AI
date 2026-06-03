import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface AvatarProps {
  type: "bot" | "user";
  className?: string;
}

export const Avatar = ({ type, className }: AvatarProps) => {
  return (
    <div
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
        type === "bot" ? "bg-[#1E293B] border border-[#334155]" : "bg-[#6366F1]",
        className
      )}
    >
      {type === "bot" ? (
        <Bot size={18} className="text-[#F8FAFC]" />
      ) : (
        <User size={18} className="text-white" />
      )}
    </div>
  );
};
