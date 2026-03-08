import { createSlice } from '@reduxjs/toolkit';
import { dishes as initialDishes } from '../../data/dishes';

const initialState = {
  items: initialDishes.map(dish => ({
    ...dish,
    orderCount: dish.orderCount || 0
  })),
  loading: false,
  error: null,
  selectedDish: null,
  deliveryAreas: [
    'Центр',
    'Базар',
    'ул. Ленина',
    'ул. Шамшинская',
  ]
};

const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    addDish: (state, action) => {
      const newDish = {
        id: state.items.length + 1,
        ...action.payload,
        orderCount: 0,
        available: true
      };
      state.items.push(newDish);
    },
    updateDish: (state, action) => {
      const index = state.items.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    deleteDish: (state, action) => {
      state.items = state.items.filter(d => d.id !== action.payload);
    },
    toggleAvailability: (state, action) => {
      const dish = state.items.find(d => d.id === action.payload);
      if (dish) {
        dish.available = !dish.available;
      }
    },
    selectDish: (state, action) => {
      state.selectedDish = state.items.find(d => d.id === action.payload) || null;
    },
    incrementOrderCount: (state, action) => {
      const dish = state.items.find(d => d.id === action.payload);
      if (dish) {
        dish.orderCount += 1;
        console.log(`Увеличили счетчик для ${dish.name}: теперь ${dish.orderCount}`);
      }
    }
  }
});

export const { 
  addDish, 
  updateDish, 
  deleteDish, 
  toggleAvailability, 
  selectDish,
  incrementOrderCount 
} = dishesSlice.actions;
export default dishesSlice.reducer;