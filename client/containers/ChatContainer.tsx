"use client";

import { useEffect } from "react";
import { ConversationList } from "@/components/conversation/ConversationList";
import { NewChatButton } from "@/components/conversation/NewChatButton";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { useConversationStore } from "@/store/conversation.store";
import { conversationService } from "@/services/conversation.service";

import { cn } from "@/lib/utils";

export const ChatContainer = () => {
  const { setConversations, isSidebarOpen, setSidebarOpen } = useConversationStore();
  useEffect(() => {
    let prevWidth = window.innerWidth;
    
    const handleResize = () => {
      const currWidth = window.innerWidth;
      // If resizing from desktop to mobile, auto-close
      if (currWidth < 768 && prevWidth >= 768) {
        setSidebarOpen(false);
      }
      // If resizing from mobile to desktop, auto-open
      else if (currWidth >= 768 && prevWidth < 768) {
        setSidebarOpen(true);
      }
      prevWidth = currWidth;
    };

    // Initial check on mount
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true); // Open by default on desktop
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarOpen]);
  useEffect(() => {
    // Fetch initial conversations
    const fetchConversations = async () => {
      try {
        const response = await conversationService.getConversations();
        // setConversations(response.data);
        
        // Mock data for demo
        setConversations([
          { id: '1', title: 'Refund Policy', updatedAt: new Date() },
          { id: '2', title: 'Shipping Status', updatedAt: new Date() },
        ]);
      } catch (error) {
        console.error("Failed to load conversations:", error);
      }
    };
    
    fetchConversations();
  }, [setConversations]);

  return (
    <div className="flex h-screen w-full bg-[#0F172A] overflow-hidden text-[#F8FAFC]">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed md:relative z-30 h-full bg-[#111827] border-r border-[#334155] flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out",
          isSidebarOpen 
            ? "translate-x-0 w-[280px]" 
            : "-translate-x-full w-[280px] md:translate-x-0 md:w-0 md:border-transparent md:overflow-hidden"
        )}
      >
        <NewChatButton />
        <ConversationList />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatWindow />
      </div>
    </div>
  );
};
