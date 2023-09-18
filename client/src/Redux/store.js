import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import routeReducer from "./slices/routeSlice";
import usersReducer from "./slices/usersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    routes: routeReducer,
    users: usersReducer,
  },
});

export default store;
