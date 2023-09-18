import { createSlice } from "@reduxjs/toolkit";
import { handleFetch, handleCreate } from "./commonThunks";

const routeSlice = createSlice({
  name: "routes",
  initialState: {
    routes: [],
    loading: false,
  },
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(handleFetch.pending, (state) => ({
      ...state,
      loading: true,
      routes: [],
    }))
      .addCase(handleFetch.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        routes: payload.data,
      }))
      .addCase(handleFetch.rejected, (state) => ({
        ...state,
        loading: false,
        routes: [],
      }));

    builder.addCase(handleCreate.pending, (state) => ({
      ...state,
      loading: true,
    })).addCase(handleCreate.fulfilled, (state) => ({
      ...state,
      loading: false,
    })).addCase(handleCreate.rejected, (state) => ({
      ...state,
      loading: false,
    }));
  },
});

export default routeSlice.reducer;
