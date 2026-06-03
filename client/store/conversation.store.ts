import { create } from 'zustand';

export interface Conversation {
  id: string;
  title: string;
  updatedAt: Date;
}

interface ConversationState {
  conversations: Conversation[];
  activeConversationId: string | null;
  isSidebarOpen: boolean;
  setConversations: (conversations: Conversation[]) => void;
  addConversation: (conversation: Conversation) => void;
  deleteConversation: (id: string) => void;
  setActiveConversationId: (id: string | null) => void;
  setSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
}

export const useConversationStore = create<ConversationState>((set) => ({
  conversations: [],
  activeConversationId: null,
  isSidebarOpen: false,
  setConversations: (conversations) => set({ conversations }),
  addConversation: (conv) => set((state) => ({ conversations: [conv, ...state.conversations] })),
  deleteConversation: (id) => set((state) => ({
    conversations: state.conversations.filter(c => c.id !== id),
    activeConversationId: state.activeConversationId === id ? null : state.activeConversationId
  })),
  setActiveConversationId: (id) => set({ activeConversationId: id }),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
