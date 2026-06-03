import { useConversationStore } from "@/store/conversation.store";
import { ConversationItem } from "@/components/conversation/ConversationItem";

export const ConversationList = () => {
  const { conversations } = useConversationStore();

  return (
    <div className="flex-1 overflow-y-auto mt-4 space-y-1 px-3">
      <div className="px-2 mb-2">
        <h3 className="text-[14px] font-medium text-[#94A3B8]">Recent Chats</h3>
      </div>
      {conversations.map((conversation) => (
        <ConversationItem key={conversation.id} conversation={conversation} />
      ))}
      {conversations.length === 0 && (
        <div className="px-2 text-sm text-[#94A3B8] italic mt-4">
          No recent chats
        </div>
      )}
    </div>
  );
};
