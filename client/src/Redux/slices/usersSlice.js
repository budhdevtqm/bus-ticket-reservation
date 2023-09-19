import { createSlice } from "@reduxjs/toolkit";
import { handleFetch, fetchSingle } from "./commonThunks";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleFetch.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(handleFetch.fulfilled, (state, { payload }) => ({
        ...state,
        users: payload.data,
      }))
      .addCase(handleFetch.rejected, (state) => ({
        ...state,
        loading: false,
      }))
      .addCase(fetchSingle.pending, (state) => ({ ...state }))
      .addCase(fetchSingle.fulfilled, (state, action) => {
        console.log(action.payload, "payload"); // Use action.payload here
        return {
          ...state,
          user: action.payload.data, // Corrected payload access
        };
      })
      .addCase(fetchSingle.rejected, (state) => ({ ...state }));
  },
});

export default usersSlice.reducer;
