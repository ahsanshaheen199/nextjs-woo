import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import api from '../../lib/axios';
import { Product } from '../../types/Product';


export const incrementCartItem = createAsyncThunk(
  'cart/incrementCartItem',
  async( data: { productId: number, quantity: number }, { getState } ) => {
    const state = getState() as RootState;
    const found = state.cart.lineItems.find( item => item.id === data.productId );

    if( found ) {
      const response = await api.post('/v1/cart/items', { id: found.id, quantity: found.quantity + data.quantity }, { headers: { Nonce: state.global.nonce } });
      return response.data;
    } else {
      const response = await api.post('/v1/cart/items', { id: data.productId, quantity: data.quantity }, { headers: { Nonce: state.global.nonce } });
      return response.data;
    }
  }
);