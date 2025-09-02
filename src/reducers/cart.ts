import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    id: string;
    name?: string;
    qty: number;
    price?: number;
    line?: number;
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: [] as CartItem[],
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const found = state.find((i) => i.id === id);
      if (found) {
        found.qty += 1;
      } else {
        state.push({ id, qty: 1 });
      }
    },
    setQty: (state, action: PayloadAction<{ id: string; qty: number }>) => {
      const { id, qty } = action.payload;
      const found = state.find((i) => i.id === id);
      if (found) {
        found.qty = Math.max(1, qty);
      }else{
        state.push({ id, qty: Math.max(1, qty) });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      return state.filter((i) => i.id !== action.payload);
    },
    clear: () => {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, setQty, clear } = cartSlice.actions;

export default cartSlice.reducer;