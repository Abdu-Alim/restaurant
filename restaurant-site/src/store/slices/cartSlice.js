import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => 
        item.id === action.payload.id && 
        JSON.stringify(item.options) === JSON.stringify(action.payload.options)
      );
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      state.total = state.items.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0
      );
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((_, index) => index !== action.payload);
      state.total = state.items.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0
      );
    },
    updateQuantity: (state, action) => {
      const { index, quantity } = action.payload;
      if (quantity > 0) {
        state.items[index].quantity = quantity;
      } else {
        state.items.splice(index, 1);
      }
      state.total = state.items.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;