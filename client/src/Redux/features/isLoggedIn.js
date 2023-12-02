import { createSlice } from "@reduxjs/toolkit";
const isLoggdeInSlice = createSlice({
    name:"isLoggedIn",
    initialState:{
        loginVar:false,
    },
    reducers:{
        checkLogin:(state,action)=>{
            state.loginVar = action.payload;
        }
    }
})

export const{ checkLogin} = isLoggdeInSlice.actions;
export default isLoggdeInSlice.reducer;