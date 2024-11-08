import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  email: string | null;
  password: string | null;
  ip: string | null;
  isVerified: boolean;
  isLoggedIn: boolean;
  actions: {
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setIp: (ip: string) => void;
    setVerified: (verified: boolean) => void;
    setLoggedIn: (loggedIn: boolean) => void;
    logout: () => void;
  };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: null,
      password: null,
      ip: null,
      isVerified: false,
      isLoggedIn: false,
      actions: {
        setEmail: (email) => set({ email }),
        setPassword: (password) => set({ password }),
        setIp: (ip) => set({ ip }),
        setVerified: (verified) => set({ isVerified: verified }),
        setLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
        logout: () => set({ 
          email: null, 
          password: null, 
          ip: null, 
          isVerified: false, 
          isLoggedIn: false 
        }),
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        email: state.email,
        isLoggedIn: state.isLoggedIn,
        isVerified: state.isVerified,
      }),
    }
  )
);