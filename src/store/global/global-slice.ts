import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GlobalState = {
  nonce: null | string;
};

const initialGlobaltState: GlobalState = {
  nonce: null,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState: initialGlobaltState,
  reducers: {
    addNonce: (state: GlobalState, action: PayloadAction<string>) => {
      state.nonce = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { addNonce } = globalSlice.actions;

export default globalSlice.reducer;
