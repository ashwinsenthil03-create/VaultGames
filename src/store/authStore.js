import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: () => !!get().user,

      login: (email, password) => {
        // Mock auth — replace with real API call
        if (!email || !password) return { error: 'Please fill in all fields.' };
        if (password.length < 6) return { error: 'Password must be at least 6 characters.' };
        const user = {
          id: 1,
          email,
          username: email.split('@')[0],
          avatar: email[0].toUpperCase(),
          joinDate: new Date().toLocaleDateString(),
          library: [],
        };
        set({ user });
        return { success: true };
      },

      register: (email, username, password) => {
        if (!email || !username || !password) return { error: 'Please fill in all fields.' };
        if (password.length < 6) return { error: 'Password must be at least 6 characters.' };
        const user = {
          id: Date.now(),
          email,
          username,
          avatar: username[0].toUpperCase(),
          joinDate: new Date().toLocaleDateString(),
          library: [],
        };
        set({ user });
        return { success: true };
      },

      addToLibrary: (game) => {
        const u = get().user;
        if (!u) return;
        const already = u.library.find(g => g.id === game.id);
        if (already) return;
        set({ user: { ...u, library: [...u.library, game] } });
      },

      logout: () => set({ user: null }),
    }),
    { name: 'gamestore-auth' }
  )
);
