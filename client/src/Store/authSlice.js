import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config";

const initialState = {
  isLoggedIn: false,
  loading: false,
  user: {},
};

export const login = createAsyncThunk("auth/login", async (data) => {
  console.log(data, "values");
  try {
    const logging = await axios.post(`${BASE_URL}/login/user`, data);
    console.log(logging, "logging");
  } catch (error) {
    console.log(error, "loggin-err");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    },
    [login.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default authSlice.reducer;
