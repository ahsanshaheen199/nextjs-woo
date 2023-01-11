import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import api from '../../lib/axios';

export const incrementCartItem = createAsyncThunk(
  'cart/incrementCartItem',
  async( data: { productId: number, quantity: number }, { getState } ) => {
    const state = getState() as RootState;
    const found = state.cart.lineItems.find( item => item.id === data.productId );

    if( found ) {
      const response = await api.post('/v1/cart/items/', {id: data.productId, quantity: found.quantity + data.quantity }, { headers: { Nonce: state.global.nonce } });
      return response.data;
    } else {
      const response = await api.post('/v1/cart/items', { id: data.productId, quantity: data.quantity }, { headers: { Nonce: state.global.nonce } });
      return response.data;
    }
  }
);

export const decrementCartItem = createAsyncThunk(
  'cart/decrementCartItem',
  async( data: { productId: number, quantity: number }, { getState } ) => {
    const state = getState() as RootState;
    const found = state.cart.lineItems.find( item => item.id === data.productId );

    if( found && found.quantity > 1 ) {
      const response = await api.post(`/v1/cart/items/`, {id: data.productId, quantity: found.quantity - 1 }, { headers: { Nonce: state.global.nonce } });
      return found.id as number;
    } 

    if( found && found.quantity === 1 ) {
      return found.id as number;
    }
  }
);