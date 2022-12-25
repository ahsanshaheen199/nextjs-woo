import { createSlice } from '@reduxjs/toolkit';

type CartState = {
    lineItem: []
}

const initialCartState: CartState = {
  lineItem : []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {

  }
});

export default cartSlice.reducer;