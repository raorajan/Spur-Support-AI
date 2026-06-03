import axios from 'axios';

// Placeholder for actual API calls
export const chatService = {
  sendMessage: async (message: string, conversationId?: string) => {
    // return axios.post('/api/chat', { message, conversationId });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { response: "This is a mock AI response." } });
      }, 1000);
    });
  }
};
