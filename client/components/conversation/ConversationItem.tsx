import { MessageCircle, MoreHorizontal, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useConversationStore } from "@/store/conversation.store";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

import { useChatStore } from "@/store/chat.store";
import { ApiConversation } from "@/types/api.types";

interface ConversationItemProps {
  conversation: ApiConversation;
}

export const ConversationItem = ({ conversation }: ConversationItemProps) => {
  const { activeConversationId, setActiveConversationId, setSidebarOpen, removeConversation } = useConversationStore();
  const { fetchMessages, clearMessages } = useChatStore();
  const isActive = activeConversationId === conversation.id;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
    
    if (isActive) return;

    setActiveConversationId(conversation.id);
    clearMessages();
    fetchMessages(conversation.id);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await removeConversation(conversation.id);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="relative group flex items-center">
        <button
          onClick={handleSelect}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left pr-10 cursor-pointer",
            isActive 
              ? "bg-[#1E293B] text-[#F8FAFC]" 
              : "text-[#94A3B8] hover:bg-[#1E293B]/50 hover:text-[#F8FAFC]"
          )}
        >
          <MessageCircle size={16} className={cn("shrink-0", isActive ? "text-[#6366F1]" : "")} />
          <span className="truncate">{conversation.title}</span>
        </button>

        <div className="absolute right-2 flex items-center" ref={dropdownRef}>
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              setIsDropdownOpen(!isDropdownOpen); 
            }}
            className={cn(
              "p-1.5 rounded-md transition-opacity text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#334155] cursor-pointer",
              isActive || isDropdownOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
          >
            <MoreHorizontal size={16} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-1 w-36 bg-[#0F172A] 
                            border border-[#1E293B] rounded-lg shadow-xl z-50 p-1 overflow-hidden">
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setIsModalOpen(true); 
                  setIsDropdownOpen(false); 
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm cursor-pointer
                           text-[#EF4444] hover:bg-[#EF4444]/10 hover:text-[#F87171] rounded-md transition-all text-left font-medium"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-[#EF4444]/10 text-[#EF4444] rounded-full">
            <Trash2 size={20} />
          </div>
          <h3 className="text-lg font-semibold text-[#F8FAFC]">Delete Chat</h3>
        </div>
        <p className="text-[#94A3B8] text-sm mb-6 leading-relaxed">
          Are you sure you want to delete this conversation? All messages will be permanently removed. This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3 pt-2 border-t border-[#334155]/50 mt-2">
          <Button 
            variant="ghost" 
            onClick={() => setIsModalOpen(false)}
            className="cursor-pointer hover:bg-[#334155]/50 text-[#94A3B8] hover:text-[#F8FAFC]"
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            className="cursor-pointer bg-[#EF4444] hover:bg-[#DC2626] text-white border-none shadow-lg shadow-red-900/20" 
            onClick={handleDelete}
          >
            Yes, Delete
          </Button>
        </div>
      </Modal>
    </>
  );
};
