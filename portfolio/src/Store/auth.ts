// store/useAuthStore.ts
import { decryptData, encryptData } from '@/Util/encryption';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userName: string | null;
  id: string | null;
  setTokens: (accessToken: string | null, refreshToken: string | null, userName: string | null) => void;
  clearTokens: () => void;
  setuserId: (id: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      userName: null,
      id: null,
      setTokens: (accessToken, refreshToken, userName) =>
        set({ accessToken, refreshToken, userName }),
      clearTokens: () =>
        set({ accessToken: null, refreshToken: null, userName: null, id: null }),
      setuserId: (id) => set({ id }),
    }),
    {
      name: 'auth-Cv',
      storage: {
        getItem: (name) => {
          const encrypted = localStorage.getItem(name);
          if (!encrypted) return null;
          try {
            return decryptData(encrypted);
          } catch (err) {
            console.error('Giải mã thất bại:', err);
            return null;
          }
        },
        setItem: (name, value) => {
          const encrypted = encryptData(value);
          localStorage.setItem(name, encrypted);
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
