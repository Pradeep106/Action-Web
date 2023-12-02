import { createSlice } from "@reduxjs/toolkit";

const amount = createSlice({
  name: "amount",
  initialState: {
    price: 0,
  },
  reducers: {
    setAmount: (state, action) => {
      state.price = action.payload;
    }
  }
});


export const { setAmount } = amount.actions;
export default amount.reducer;
