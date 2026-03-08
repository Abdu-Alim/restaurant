import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: (state, action) => {
      const newReview = {
        id: state.items.length + 1,
        date: new Date().toISOString(),
        ...action.payload
      };
      state.items.push(newReview);
    },
    deleteReview: (state, action) => {
      state.items = state.items.filter(r => r.id !== action.payload);
    }
  }
});

export const { addReview, deleteReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;
