import { createSlice } from "@reduxjs/toolkit";
import { getFlights } from "./actions";

const initialState = {
  flights: [],
  isLoading: true,
  isError: false,
  route: [],
};
export const flightSlice = createSlice({
  name: "flightSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getFlights.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFlights.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.flights = action.payload;
      })
      .addCase(getFlights.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
  reducers: {
    setRoute: (state, action) => {
      const newRoute = action.payload.map((i) => [i.lat, i.lng]);
      state.route = newRoute;
    },
  },
});

export default flightSlice.reducer;
export const { setRoute } = flightSlice.actions;
