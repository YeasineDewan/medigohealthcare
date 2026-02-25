import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      discount: 0,
      cartNotes: '',
      
      addItem: (item, quantity = 1) => set((state) => {
        const existing = state.items.find((i) => i.id === item.id);
        if (existing) {
          return {
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
            ),
          };
        }
        return { items: [...state.items, { ...item, quantity, prescription: item.prescription || null }] };
      }),
      
      removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id),
      })),
      
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity: Math.max(0, quantity) } : i
        ).filter((i) => i.quantity > 0),
      })),
      
      updatePrescription: (id, prescription) => set((state) => ({
        items: state.items.map((i) =>
          i.id === id ? { ...i, prescription } : i
        ),
      })),
      
      clearCart: () => set({ items: [], promoCode: null, discount: 0, cartNotes: '' }),
      
      setCartNotes: (notes) => set({ cartNotes: notes }),
      
      applyPromoCode: (code) => {
        // Mock promo code validation - replace with API call
        const promoCodes = {
          'SAVE10': { type: 'percentage', value: 10 },
          'FLAT50': { type: 'fixed', value: 50 },
          'HEALTH20': { type: 'percentage', value: 20 },
        };
        
        const promo = promoCodes[code.toUpperCase()];
        if (promo) {
          const subtotal = get().getSubtotal();
          const discountAmount = promo.type === 'percentage' 
            ? (subtotal * promo.value) / 100 
            : promo.value;
          
          set({ promoCode: code.toUpperCase(), discount: discountAmount });
          return { success: true, message: `Promo code applied! You saved ৳${discountAmount.toFixed(2)}` };
        }
        return { success: false, message: 'Invalid promo code' };
      },
      
      removePromoCode: () => set({ promoCode: null, discount: 0 }),
      
      getSubtotal: () => {
        const state = get();
        return state.items.reduce((sum, i) => sum + (i.price || 0) * i.quantity, 0);
      },
      
      getTax: () => {
        const subtotal = get().getSubtotal();
        return subtotal * 0.05; // 5% tax
      },
      
      getShipping: () => {
        const subtotal = get().getSubtotal();
        return subtotal >= 500 ? 0 : 50; // Free shipping over 500
      },
      
      getTotal: () => {
        const state = get();
        const subtotal = state.getSubtotal();
        const tax = state.getTax();
        const shipping = state.getShipping();
        return subtotal + tax + shipping - state.discount;
      },
    }),
    { name: 'medigo-cart' }
  )
);
