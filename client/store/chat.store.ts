import { create } from 'zustand';
import { chatService } from '../services/chat.service';
import { ApiMessage } from '../types/api.types';

interface ChatState {
  messages: ApiMessage[];
  isLoading: boolean;
  
  fetchMessages: (conversationId: string) => Promise<void>;
  sendMessage: (conversationId: string, content: string) => Promise<void>;
  
  addOptimisticMessage: (message: ApiMessage) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isLoading: false,

  fetchMessages: async (conversationId: string) => {
    set({ isLoading: true });
    try {
      const messages = await chatService.getMessages(conversationId);
      set({ messages });
    } catch (error) {
      console.error("Failed to fetch messages", error);
    } finally {
      set({ isLoading: false });
    }
  },

  sendMessage: async (conversationId: string, content: string) => {
    set({ isLoading: true });
    try {
      const response = await chatService.sendMessage(content, conversationId);
      
      set((state) => {
        // Remove optimistic message if it exists (we assume the last user message might be optimistic, 
        // but it's safer to just filter out the optimistic one if we give it a specific ID format.
        // For simplicity, we just append the true DB messages and remove the temp one).
        const filtered = state.messages.filter(m => !m.id.startsWith("temp-"));
        return { messages: [...filtered, response.userMessage, response.aiMessage] };
      });
      
    } catch (error) {
      console.error("Failed to send message", error);
      // Remove optimistic message and show a friendly error
      set((state) => {
        const filtered = state.messages.filter(m => !m.id.startsWith("temp-"));
        return { 
          messages: [
            ...filtered,
            {
              id: `error-${Date.now()}`,
              conversationId,
              content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
              sender: 'ai',
              createdAt: new Date().toISOString()
            }
          ]
        };
      });
    } finally {
      set({ isLoading: false });
    }
  },

  addOptimisticMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
}));
