import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductImage } from '../../types/Product';
import { incrementCartItem } from './cart-actions';

// type LineItem = Product & { quantity: number };
type LineItem = {
  key: string;
  name: string;
  quantity: number;
  id: number;
  images: ProductImage[];
  prices: {
    price: string;
    regular_price: string;
    sale_price: string;
    currency_code: string;
    currency_symbol: string;
};
  totals: {
    line_subtotal: string;
    line_subtotal_tax: string;
    line_total: string;
    line_total_tax: string;
  }
}

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
    // incrementCart: (state: CartState, action: PayloadAction<Product>) => {
    //   const found = state.lineItems.find( item => item.id === action.payload.id );

    //   if( found ) {
    //     state.lineItems = state.lineItems.map( item => {
    //       return item.id === action.payload.id ?  { ...item, quantity: item.quantity + 1 } : item;
    //     } );
    //   } else {
    //     state.lineItems.push({ quantity: 1, ...action.payload});
    //   }
    // },
    // decrementCart: (state: CartState, action: PayloadAction<Product>) => {
    //   const found = state.lineItems.find( item => item.id === action.payload.id );

    //   if( found ) {
    //     const foundItemsQuantity = found.quantity;
    //     if( foundItemsQuantity === 1 ) {
    //       state.lineItems = state.lineItems.filter( item => item.id !== found.id );
    //     } else {
    //       state.lineItems = state.lineItems.map( item => {
    //         return item.id === action.payload.id ?  { ...item, quantity: item.quantity - 1 } : item;
    //       } );
    //     }
    //   }
    // }
  },
  extraReducers: ( builder ) => {
    builder.addCase(incrementCartItem.fulfilled, (state,action) => {
      const found = state.lineItems.find( item => item.id === action.payload.id );
      if( found ) {
        state.lineItems = state.lineItems.map( item => item.id === action.payload.id ? action.payload: item );
      } else {
        state.lineItems.push(action.payload);
      }
    } );
  }
});

// export const { incrementCart, decrementCart } = cartSlice.actions;

export default cartSlice.reducer;