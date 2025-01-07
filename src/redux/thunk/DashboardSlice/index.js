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
        console.log("action is fullfilled");
        state.houseData = action.payload;
      })
      .addCase(dashboardThunk.rejected, (state, action) => {
        console.log("thunk");
        console.log(action.error);
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default HousedashboardSlice.reducer;
