import { createSlice } from "@reduxjs/toolkit";
import { handleFetch } from "./commonThunks";

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
        routes: payload.data.data,
      }))
      .addCase(handleFetch.rejected, (state, { payload }) => {
        console.log("-payload-", payload);
        return {
          ...state,
          loading: false,
        };
      });
  },
});

export default routeSlice.reducer;

// export const getAllRoutes = () => crea
// teAsyncThunk(("/get-all-routes", async ({ returnWithValue }) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/bus-route/get-all`, headerConfig);
//     console.log(response, "-----respone-slice");
//     return response.data;
//   } catch (error) {
//     return returnWithValue(error.response.data.message);
//   }
// }));
