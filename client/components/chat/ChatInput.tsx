import { useState, useRef, KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useChatStore } from "@/store/chat.store";
import { useConversationStore } from "@/store/conversation.store";

export const ChatInput = () => {
  const [input, setInput] = useState("");
  const { sendMessage, addOptimisticMessage, isLoading } = useChatStore();
  const { activeConversationId, setActiveConversationId, createNewConversation } = useConversationStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSend = async () => {
    const val = input.trim();
    if (!val || isLoading) return;
    
    let convId = activeConversationId;
    
    if (!convId) {
      try {
        const newConv = await createNewConversation(val.length > 30 ? `${val.slice(0, 30)}...` : val);
        convId = newConv.id;
        setActiveConversationId(convId);
      } catch (err) {
        console.error("Failed to create conversation", err);
        return;
      }
    }

    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    
    // Add optimistic user message to the UI
    addOptimisticMessage({
      id: `temp-${Date.now()}`,
      conversationId: convId,
      content: val,
      sender: 'user',
      createdAt: new Date().toISOString()
    });
    
    // Call the actual API via store (this will update the UI with real messages)
    await sendMessage(convId, val);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6">
      <div className="relative flex items-end">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="w-full bg-[#1E293B] border border-[#334155] text-[#F8FAFC] 
                     rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 
                     focus:ring-[#6366F1] resize-none min-h-[52px] max-h-52 
                     placeholder:text-[#94A3B8] 
                     [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent 
                     [&::-webkit-scrollbar-thumb]:bg-[#334155] [&::-webkit-scrollbar-thumb]:rounded-full"
          rows={1}
        />
        <Button 
          size="icon"
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="absolute right-2 mb-1.5 h-8 w-8 rounded-lg bg-[#6366F1] 
                     hover:bg-[#4F46E5] text-white disabled:bg-[#334155] 
                     disabled:text-[#94A3B8]"
        >
          <Send size={16} />
        </Button>
      </div>
      <div className="text-center mt-2 text-xs text-[#94A3B8]">
        Enter to send, Shift + Enter for new line
      </div>
    </div>
  );
};
