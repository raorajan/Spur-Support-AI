"use client";

import { useEffect } from "react";
import { ConversationList } from "@/components/conversation/ConversationList";
import { NewChatButton } from "@/components/conversation/NewChatButton";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { useConversationStore } from "@/store/conversation.store";
import { cn } from "@/lib/utils";

export const ChatContainer = () => {
  const { fetchConversations, isSidebarOpen, setSidebarOpen } = useConversationStore();

  useEffect(() => {
    let prevWidth = window.innerWidth;
    
    const handleResize = () => {
      const currWidth = window.innerWidth;
      
      if (currWidth < 768 && prevWidth >= 768) {
        setSidebarOpen(false);
      } else if (currWidth >= 768 && prevWidth < 768) {
        setSidebarOpen(true);
      }
      prevWidth = currWidth;
    };

    setSidebarOpen(window.innerWidth >= 768);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarOpen]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return (
    <div className="flex h-screen w-full bg-[#0F172A] overflow-hidden text-[#F8FAFC]">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div 
        className={cn(
          "fixed md:relative z-30 h-full bg-[#111827] border-r border-[#334155]",
          "flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out",
          isSidebarOpen 
            ? "translate-x-0 w-[280px]" 
            : "-translate-x-full w-[280px] md:translate-x-0 md:w-0 md:border-transparent md:overflow-hidden"
        )}
      >
        <NewChatButton />
        <ConversationList />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <ChatWindow />
      </div>
    </div>
  );
};
