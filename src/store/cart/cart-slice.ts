import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductImage } from '../../types/Product';

type LineItem = Product & { quantity: number };

type CartState = {
    lineItems: LineItem[];
}

const initialCartState: CartState = {
  lineItems : []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    incrementCart: (state: CartState, action: PayloadAction<Product>) => {
      const found = state.lineItems.find( item => item.id === action.payload.id );

      if( found ) {
        state.lineItems = state.lineItems.map( item => {
          return item.id === action.payload.id ?  { ...item, quantity: item.quantity + 1 } : item;
        } );
      } else {
        state.lineItems.push({ quantity: 1, ...action.payload});
      }
    },
    decrementCart: (state: CartState, action: PayloadAction<Product>) => {
      const found = state.lineItems.find( item => item.id === action.payload.id );

      if( found ) {
        const foundItemsQuantity = found.quantity;
        if( foundItemsQuantity === 1 ) {
          state.lineItems = state.lineItems.filter( item => item.id !== found.id );
        } else {
          state.lineItems = state.lineItems.map( item => {
            return item.id === action.payload.id ?  { ...item, quantity: item.quantity - 1 } : item;
          } );
        }
      }
    }
  },
  extraReducers: ( builder ) => {
  }
});

export const { incrementCart, decrementCart } = cartSlice.actions;

export default cartSlice.reducer;