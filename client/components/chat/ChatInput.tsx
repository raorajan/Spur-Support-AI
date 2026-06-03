import { useState, useRef, KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useChatStore } from "@/store/chat.store";
import { useConversationStore } from "@/store/conversation.store";
import { chatService } from "@/services/chat.service";

export const ChatInput = () => {
  const [input, setInput] = useState("");
  const { addMessage, setLoading, isLoading } = useChatStore();
  const { activeConversationId, setActiveConversationId, addConversation } = useConversationStore();
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
      convId = Date.now().toString();
      addConversation({
        id: convId,
        title: val.length > 30 ? `${val.slice(0, 30)}...` : val,
        updatedAt: new Date()
      });
      setActiveConversationId(convId);
    }

    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    
    addMessage({
      id: Date.now().toString(),
      conversationId: convId,
      content: val,
      role: 'user',
      createdAt: new Date()
    });
    
    setLoading(true);
    
    try {
      const res = await chatService.sendMessage(val) as any;
      
      addMessage({
        id: (Date.now() + 1).toString(),
        conversationId: convId,
        content: res?.data?.response || "I didn't quite catch that.",
        role: 'assistant',
        createdAt: new Date()
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
