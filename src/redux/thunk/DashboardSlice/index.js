import { createSlice } from "@reduxjs/toolkit";
import { dashboardThunk } from "../allthunks";
const HousedashboardSlice = createSlice({
  name: "dashboard",
  initialState: { houseData: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(dashboardThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(dashboardThunk.fulfilled, (state, action) => {
        state.status == "succeeded";
        state.houseData = action.payload;
      })
      .addCase(dashboardThunk.rejected, (state) => {
        state.status = "failed";
        state.error = "something went wrong";
      });
  },
});

export default HousedashboardSlice.reducer;
