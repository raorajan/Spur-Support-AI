import axios from 'axios';

export const conversationService = {
  getConversations: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: [] });
      }, 500);
    });
  }
};
