import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      role: null, // 'admin' | 'doctor' | 'patient'
      setUser: (user, role) => set({ user, role }),
      logout: () => set({ user: null, role: null }),
    }),
    { name: 'medigo-auth' }
  )
);
