import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import routeReducer from "./slices/routeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    routes: routeReducer,
  },
});

export default store;
