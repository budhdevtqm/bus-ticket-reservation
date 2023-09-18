import { createSlice } from "@reduxjs/toolkit";

const busesSlice = createSlice({
  name: "buses",
  initialState: {
    loading: false,
    buses: [],
  },
  reducers: {},
  extraReducers: {},
});

export default busesSlice.actions;
