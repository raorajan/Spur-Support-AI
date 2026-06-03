import axios from 'axios';

// Placeholder for actual API calls
export const conversationService = {
  getConversations: async () => {
    // return axios.get('/api/conversations');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: [] });
      }, 500);
    });
  }
};
