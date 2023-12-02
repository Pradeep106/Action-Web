import { configureStore } from "@reduxjs/toolkit";
import getData from "../Redux/features/getData";
import isLoggedIn from "./features/isLoggedIn";
import amount from "./features/amount";

const store = configureStore({
  reducer: {
    getData: getData,
    isLoggedIn,
    amount,
  },
});

export default store;
