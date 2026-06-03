import { MessageCircle, MoreHorizontal, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Conversation, useConversationStore } from "@/store/conversation.store";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface ConversationItemProps {
  conversation: Conversation;
}

export const ConversationItem = ({ conversation }: ConversationItemProps) => {
  const { activeConversationId, setActiveConversationId, setSidebarOpen, deleteConversation } = useConversationStore();
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
    setActiveConversationId(conversation.id);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteConversation(conversation.id);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="relative group flex items-center">
        <button
          onClick={handleSelect}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left pr-10",
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
              "p-1.5 rounded-md transition-opacity text-[#94A3B8] hover:text-[#F8FAFC]",
              isActive || isDropdownOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
          >
            <MoreHorizontal size={16} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-1 w-32 bg-[#1E293B] 
                            border border-[#334155] rounded-md shadow-lg z-50 py-1">
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setIsModalOpen(true); 
                  setIsDropdownOpen(false); 
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm 
                           text-[#EF4444] hover:bg-[#334155] transition-colors text-left"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-lg font-medium text-[#F8FAFC] mb-2">Delete Chat</h3>
        <p className="text-[#94A3B8] text-sm mb-6">Are you sure you want to delete this conversation? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setIsModalOpen(false)}>No, Cancel</Button>
          <Button 
            variant="primary" 
            className="bg-[#EF4444] hover:bg-[#DC2626] border-none" 
            onClick={handleDelete}
          >
            Yes, Delete
          </Button>
        </div>
      </Modal>
    </>
  );
};
