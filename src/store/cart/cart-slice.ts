import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductImage } from '../../types/Product';

type LineItem = Pick<Product, 'id' | 'name' | 'images'> & { quantity: number };

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
    }
  },
  extraReducers: ( builder ) => {
  }
});

export const { incrementCart } = cartSlice.actions;

export default cartSlice.reducer;