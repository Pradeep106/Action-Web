import { createSlice } from "@reduxjs/toolkit";

const getData = createSlice({
  name: "getData",
  initialState: {
    resData: ""
  },
  reducers: {
    fetchData: (state, action) => {
      state.data = action.payload;
    }
  }
});


export const { fetchData } = getData.actions;
export default getData.reducer;
