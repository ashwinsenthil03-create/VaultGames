import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { finalPrice } from '../data/games';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (game) => {
        const exists = get().items.find(i => i.id === game.id);
        if (exists) return;
        set(state => ({ items: [...state.items, game] }));
      },

      removeItem: (id) =>
        set(state => ({ items: state.items.filter(i => i.id !== id) })),

      hasItem: (id) => !!get().items.find(i => i.id === id),

      total: () =>
        get().items.reduce((sum, g) => sum + parseFloat(finalPrice(g)), 0).toFixed(2),

      count: () => get().items.length,

      clear: () => set({ items: [] }),
    }),
    { name: 'gamestore-cart' }
  )
);
