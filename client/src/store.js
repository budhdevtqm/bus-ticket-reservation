import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Redux/authSlice";

export const store = configureStore({
  reducer: { auth: authReducer },
});
