import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  currentOrder: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    createOrder: (state, action) => {
      const newOrder = {
        id: state.items.length + 1,
        date: new Date().toISOString(),
        status: 'новый',
        ...action.payload
      };
      state.items.push(newOrder);
      state.currentOrder = newOrder;
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.items.find(o => o.id === orderId);
      if (order) {
        order.status = status;
      }
    }
  }
});

export const { createOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
