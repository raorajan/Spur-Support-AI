import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useConversationStore } from "@/store/conversation.store";
import { useChatStore } from "@/store/chat.store";

export const NewChatButton = () => {
  const { setActiveConversationId } = useConversationStore();
  const { clearMessages } = useChatStore();

  const handleNewChat = () => {
    setActiveConversationId(null);
    clearMessages();
  };

  return (
    <div className="px-3 pt-4">
      <Button variant="primary" className="w-full justify-start gap-2" onClick={handleNewChat}>
        <Plus size={18} />
        New Chat
      </Button>
    </div>
  );
};
