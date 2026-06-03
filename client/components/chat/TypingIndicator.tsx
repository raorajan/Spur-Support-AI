import { Avatar } from "@/components/ui/Avatar";
import { Loader } from "@/components/ui/Loader";

export const TypingIndicator = () => {
  return (
    <div className="flex gap-4 w-full py-4">
      <Avatar type="bot" />
      <div className="flex flex-col gap-1">
        <span className="text-xs text-[#94A3B8] font-medium ml-1">Spur Support AI is typing</span>
        <div className="bg-[#1E293B] border border-[#334155] p-3 
                        rounded-2xl rounded-tl-sm w-fit">
          <Loader />
        </div>
      </div>
    </div>
  );
};
