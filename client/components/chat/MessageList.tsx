import { useEffect, useRef } from "react";
import { useChatStore } from "@/store/chat.store";
import { useConversationStore } from "@/store/conversation.store";
import { ChatMessage } from "./ChatMessage";
import { EmptyChat } from "./EmptyChat";
import { TypingIndicator } from "./TypingIndicator";
import { scrollToBottom } from "@/utils/scroll";

export const MessageList = () => {
  const { messages, isLoading } = useChatStore();
  const { activeConversationId } = useConversationStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentMessages = messages.filter(m => m.conversationId === activeConversationId);

  useEffect(() => {
    scrollToBottom(scrollRef);
  }, [currentMessages, isLoading]);

  if (currentMessages.length === 0) {
    return <EmptyChat />;
  }

  return (
    <div 
      ref={scrollRef}
      className="flex-1 h-full overflow-y-auto p-6 scroll-smooth 
                 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      <div className="max-w-4xl mx-auto flex flex-col pb-56">
        {currentMessages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && <TypingIndicator />}
      </div>
    </div>
  );
};
