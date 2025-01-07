import { createSlice } from "@reduxjs/toolkit";
import { weatherDashboardThunk } from "../allthunks";
const WeatherdashboardSlice = createSlice({
  name: "dashboard",
  initialState: { weatherDashboardData: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(weatherDashboardThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(weatherDashboardThunk.fulfilled, (state, action) => {
        state.status == "succeeded";
        console.log("action=", action.payload);
        state.weatherDashboardData = action.payload;
      })
      .addCase(weatherDashboardThunk.rejected, (state, action) => {
        state.status = "failed";
        console.log(error);
        state.error = action.error.message || "something went wrong";
      });
  },
});

export default WeatherdashboardSlice.reducer;
