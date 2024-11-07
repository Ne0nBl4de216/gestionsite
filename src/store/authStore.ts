import { create } from 'zustand';

interface AuthState {
  email: string | null;
  password: string | null;
  ip: string | null;
  isVerified: boolean;
  isLoggedIn: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setIp: (ip: string) => void;
  setVerified: (verified: boolean) => void;
  setLoggedIn: (loggedIn: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: null,
  password: null,
  ip: null,
  isVerified: false,
  isLoggedIn: false,
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setIp: (ip) => set({ ip }),
  setVerified: (verified) => set({ isVerified: verified }),
  setLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  logout: () => set({ email: null, password: null, ip: null, isVerified: false, isLoggedIn: false }),
}));