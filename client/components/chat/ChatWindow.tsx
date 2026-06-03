import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";

export const ChatWindow = () => {
  return (
    <div className="flex flex-col h-full bg-[#0F172A] w-full relative">
      <ChatHeader />
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0">
          <MessageList />
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/90 to-transparent pt-12 pb-4">
          <ChatInput />
        </div>
      </div>
    </div>
  );
};
