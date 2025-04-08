import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the interface for the store state
export interface AuthState {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
}

// Create the store with explicit typing and enhanced persistence
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
      // Explicitly define storage to use localStorage with a check for window
      storage: createJSONStorage(() => {
        // Check if window is defined (browser environment)
        if (typeof window !== 'undefined') {
          return localStorage;
        }
        // Fallback for SSR
        return {
          getItem: () => null,
          setItem: () => null,
          removeItem: () => null,
        };
      }),
    }
  )
);