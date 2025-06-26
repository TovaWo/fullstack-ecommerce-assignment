import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Order, OrderResponse } from '../../types';
import { submitOrder } from '../../api/api';

interface CartState {
  items: CartItem[];
  submitting: boolean;
  orderResponse: OrderResponse | null;
}

const initialState: CartState = {
  items: [],
  submitting: false,
  orderResponse: null,
};

export const submitOrderThunk = createAsyncThunk(
  'cart/submitOrder',
  async (order: Order) => {
    const response = await submitOrder(order);
    return response;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item =>
        item.name === action.payload.name && item.categoryId === action.payload.categoryId
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    clearOrderResponse: (state) => {
      state.orderResponse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrderThunk.pending, (state) => {
        state.submitting = true;
        state.orderResponse = null;
      })
      .addCase(submitOrderThunk.fulfilled, (state, action) => {
        state.submitting = false;
        state.orderResponse = action.payload;
        if (action.payload.success) {
          state.items = [];
        }
      })
      .addCase(submitOrderThunk.rejected, (state, action) => {
        state.submitting = false;
        state.orderResponse = {
          success: false,
          message: action.error.message || 'Error during sending order',
        };
      });
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, clearOrderResponse } = cartSlice.actions;
export default cartSlice.reducer;