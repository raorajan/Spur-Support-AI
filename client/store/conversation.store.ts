import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { conversationService } from '../services/conversation.service';
import { ApiConversation } from '../types/api.types';

interface ConversationState {
  conversations: ApiConversation[];
  activeConversationId: string | null;
  isSidebarOpen: boolean;
  isLoading: boolean;
  
  fetchConversations: () => Promise<void>;
  createNewConversation: (title?: string) => Promise<ApiConversation>;
  removeConversation: (id: string) => Promise<void>;
  
  setActiveConversationId: (id: string | null) => void;
  setSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
}

export const useConversationStore = create<ConversationState>()(
  persist(
    (set, get) => ({
      conversations: [],
      activeConversationId: null,
      isSidebarOpen: false,
      isLoading: false,

      fetchConversations: async () => {
        set({ isLoading: true });
        try {
          const conversations = await conversationService.getConversations();
          set({ conversations });
        } catch (error) {
          console.error("Failed to fetch conversations", error);
        } finally {
          set({ isLoading: false });
        }
      },

      createNewConversation: async (title?: string) => {
        const newConv = await conversationService.createConversation(title);
        set((state) => ({ 
          conversations: [newConv, ...state.conversations],
          activeConversationId: newConv.id
        }));
        return newConv;
      },

      removeConversation: async (id: string) => {
        try {
          await conversationService.deleteConversation(id);
          set((state) => ({
            conversations: state.conversations.filter(c => c.id !== id),
            activeConversationId: state.activeConversationId === id ? null : state.activeConversationId
          }));
        } catch (error) {
          console.error("Failed to delete conversation", error);
        }
      },

      setActiveConversationId: (id) => set({ activeConversationId: id }),
      setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    }),
    {
      name: 'spur-conversation-storage',
      partialize: (state) => ({ activeConversationId: state.activeConversationId }),
    }
  )
);
