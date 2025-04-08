import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the interface for the store state
export interface AuthState {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
}

// Create the store with explicit typing
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userEmail: null,
      login: (email: string) => set({ isAuthenticated: true, userEmail: email }),
      logout: () => set({ isAuthenticated: false, userEmail: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);