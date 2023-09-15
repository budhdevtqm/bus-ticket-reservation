import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config";

export const loginAsync = createAsyncThunk("/user/login", async (values, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, { email: values.email, password: values.password });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const signupAsync = createAsyncThunk("/user/signup", async (values, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, values);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    loading: false,
    isLoggedIn: false,
    permissions: "",
    token: "",
    created: "",
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("permissions");
      localStorage.removeItem("totalAmount");
      localStorage.removeItem("busRouteId");
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        token: "",
        permissions: "",
      };
    },
    reset: (state) => ({
      ...state,
      loading: false,
      isLoggedIn: false,
      token: "",
      permissions: "",
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.pending, (state) => ({
      ...state,
      loading: true,

    }))
      .addCase(loginAsync.fulfilled, (state, { payload }) => {
        localStorage.setItem("token", payload.token);
        localStorage.setItem("permissions", payload.permissions);

        return {
          ...state,
          loading: false,
          token: payload.token,
          isLoggedIn: true,
          permissions: payload.permissions,
        };
      })
      .addCase(loginAsync.rejected, (state) => ({
        ...state,
        loading: false,
        isLoggedIn: false,
        permissions: "",
        token: "",
      }))
      .addCase(signupAsync.pending, (state) => ({
        ...state,
        loading: true,
        isLoggedIn: false,
        permissions: "",
        token: "",
      }))
      .addCase(signupAsync.fulfilled, (state) => ({
        ...state,
        loading: false,
        isLoggedIn: false,
        permissions: "",
        token: "",
      }))
      .addCase(signupAsync.rejected, (state) => ({
        ...state,
        loading: false,
        isLoggedIn: false,
        permissions: "",
        token: "",
      }));
  },
});

export const { logout, reset } = authSlice.actions;
export default authSlice.reducer;
