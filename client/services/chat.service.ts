import axios from 'axios';

export const chatService = {
  sendMessage: async (message: string, conversationId?: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { response: "This is a mock AI response." } });
      }, 1000);
    });
  }
};
