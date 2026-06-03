import { PanelLeft } from "lucide-react";
import { useConversationStore } from "@/store/conversation.store";

export const ChatHeader = () => {
  const { toggleSidebar } = useConversationStore();

  return (
    <div className="h-16 border-b border-[#334155] bg-[#0F172A]/95 
                    backdrop-blur sticky top-0 z-10 flex items-center px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
          className="p-2 -ml-2 text-[#94A3B8] hover:text-[#F8FAFC] 
                     hover:bg-[#1E293B] rounded-lg transition-colors"
        >
          <PanelLeft size={20} />
        </button>
        <div className="text-2xl">🤖</div>
        <div>
          <h2 className="font-semibold text-[#F8FAFC]">Spur Support AI</h2>
          <div className="flex items-center gap-1.5 text-xs text-[#22C55E]">
            <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full"></span>
            Online
          </div>
        </div>
      </div>
    </div>
  );
};
