import { useEffect, useRef } from "react";
import { useChatStore } from "@/store/chat.store";
import { useConversationStore } from "@/store/conversation.store";
import { ChatMessage } from "./ChatMessage";
import { EmptyChat } from "./EmptyChat";
import { TypingIndicator } from "./TypingIndicator";
import { scrollToBottom } from "@/utils/scroll";

export const MessageList = () => {
  const { messages, isLoading, isFetchingMessages } = useChatStore();
  const { activeConversationId } = useConversationStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentMessages = messages.filter(m => m.conversationId === activeConversationId);

  useEffect(() => {
    scrollToBottom(scrollRef);
  }, [currentMessages, isLoading]);

  if (currentMessages.length === 0) {
    if (!activeConversationId) {
      return <EmptyChat />;
    }

    if (isFetchingMessages) {
      return (
        <div className="flex-1 h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6366F1]"></div>
            <p className="text-sm text-[#94A3B8]">Loading messages...</p>
          </div>
        </div>
      );
    }
    // If neither, it falls through to render the chat window with the typing indicator.
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
