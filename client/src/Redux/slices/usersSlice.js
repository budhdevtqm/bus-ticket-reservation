import { createSlice } from "@reduxjs/toolkit";
import { handleFetch } from "./commonThunks";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleFetch.pending, (state) => ({
      ...state,
      loading: true,
    })).addCase(handleFetch.fulfilled, (state, { payload }) => ({
      ...state,
      users: payload.data,
    })).addCase(handleFetch.rejected, (state) => ({
      ...state,
      loading: false,
    }));
  },
});

export default usersSlice.reducer;
