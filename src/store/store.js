import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        state.cart.push({ ...product, quantity: product.quantity || 1 });
      }
    },
    updateProductQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.cart.find(item => item.id === id);
      if (product) {
        product.quantity = quantity;
      }
    },
    removeProductFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
  },
});

export const { addProductToCart, updateProductQuantity, removeProductFromCart } = cartSlice.actions;

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
  devTools: true,
});

export default store;
