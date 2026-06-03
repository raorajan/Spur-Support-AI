import { Message } from "@/store/chat.store";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';

  return (
    <div className={cn("flex gap-4 w-full py-4", isUser ? "flex-row-reverse" : "flex-row")}>
      <Avatar type={isUser ? "user" : "bot"} />
      
      <div className={cn("flex flex-col gap-1 max-w-[80%]", isUser ? "items-end" : "items-start")}>
        <div 
          className={cn(
            "p-4 text-[15px] leading-[1.7] shadow-sm prose prose-invert max-w-none",
            isUser 
              ? "bg-[#6366F1] text-white rounded-[18px] rounded-tr-sm" 
              : "bg-[#1E293B] border border-[#334155] text-[#F8FAFC] rounded-[18px] rounded-tl-sm"
          )}
        >
          <ReactMarkdown>
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
