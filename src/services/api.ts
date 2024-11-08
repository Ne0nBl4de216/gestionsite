import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = {
  sendVerificationEmail: async (email: string) => {
    try {
      const response = await api.post('/auth/verify', { email });
      return response.data;
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw error;
    }
  },

  checkVerificationStatus: async (email: string) => {
    try {
      const response = await api.get(`/auth/verify?email=${email}`);
      return response.data;
    } catch (error) {
      console.error('Error checking verification status:', error);
      throw error;
    }
  },

  getIpAddress: async () => {
    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      return response.data.ip;
    } catch (error) {
      console.error('Error getting IP address:', error);
      throw error;
    }
  },
};