import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../api";

export const weatherThunk = createAsyncThunk(
  "fetch/WeatherData",
  async (city) => {
    const rsData = await apiRequest(city);
    console.log("response data=", rsData);
    return rsData;
  }
);

const WeatherSlice = createSlice({
  name: "weather",
  initialState: { weatherData: {}, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(weatherThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(weatherThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.weatherData = action.payload;
      })
      .addCase(weatherThunk.rejected, (state) => {
        state.status = "failed";
        state.error = "something went wrong";
      });
  },
});

export default WeatherSlice.reducer;
