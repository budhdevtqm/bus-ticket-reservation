// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config";

// eslint-disable-next-line no-unused-vars
export const loginAsync = createAsyncThunk("/user/login", async (values, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, { email: values.email, password: values.password });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    loading: false,
    token: "",
    permissions: "",
    error: "",
    message: "",
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("permissions");
      return {
        ...state,
        loading: true,
        permissions: "",
        error: "",
        token: "",

      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, { payload }) => {
      localStorage.setItem("token", payload.token);
      localStorage.setItem("permissions", payload.permissions);

      return {
        ...state,
        error: "",
        token: payload.token,
        permissions: payload.permissions,
        loading: false,
        message: payload.message,

      };
    }).addCase(loginAsync.rejected, (state, { payload }) => ({
      ...state,
      token: "",
      permissions: "",
      error: payload,
      loading: false,
      message: "",

    }));
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
