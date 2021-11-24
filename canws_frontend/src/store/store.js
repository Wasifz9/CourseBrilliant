import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/enrollment/cartSlice';
import tabReducer from '../features/tabs/tabSlice'; 

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    tabs: tabReducer
  },
});
