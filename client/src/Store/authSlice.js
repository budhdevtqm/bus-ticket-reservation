import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  permissions: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.permissions = payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.permissions = "";
      state.isLoggedIn = false;
    },
  },
});

export default authSlice.reducer;
export const { setUser, logout } = authSlice.actions;
