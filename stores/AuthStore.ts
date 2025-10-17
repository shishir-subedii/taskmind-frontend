import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
    accessToken: string | null;
    role: string | null;
    setTokens: (access: string, role: string) => void;
    clearTokens: () => void;
};
export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            role: null,
            setTokens: (access, role) => set({ accessToken: access, role }),
            clearTokens: () => set({ accessToken: null, role: null }),
        }),
        {
            name: 'auth-storage',
        }
    )
);