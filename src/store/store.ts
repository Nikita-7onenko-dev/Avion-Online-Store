import { configureStore } from '@reduxjs/toolkit';
import { filtersOptionsReducer } from './slices/filtersOptionsSlice';
import { cartReducer } from './slices/cartSlice';
import { toastsSliceReducer } from './slices/toastSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filtersOptions: filtersOptionsReducer,
    toasts: toastsSliceReducer,
  },
})

store.subscribe(() => {
  const cart = store.getState().cart;
  localStorage.setItem('cart', JSON.stringify(cart));
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch