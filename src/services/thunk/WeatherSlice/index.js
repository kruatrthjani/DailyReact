import { createSlice } from "@reduxjs/toolkit";

import {
  weatherThunk,
  deleteWeatherThunk,
  editWeatherThunk,
  addWeatherThunk,
} from "../allthunks";
// export const weatherThunk = createAsyncThunk("fetch/WeatherData", async () => {
//   const rsData = await apiRequest({ method: "GET" });
//   console.log("response data=", rsData);
//   return rsData;
// });

// export const addWeatherThunk = createAsyncThunk(
//   "add/weatherData",
//   async (data) => {
//     const resData = await apiRequest({ data, method: "POST" });
//     console.log("res data=", resData);
//     return resData;
//   }
// );

// export const editWeatherThunk = createAsyncThunk(
//   "edit/weatherData",
//   async ({ id, data }) => {
//     console.log("updated data:", data);
//     data.id = id;
//     console.log("updated Id and data=", data);
//     const resData = await apiRequest({ data, method: "PUT" });
//     console.log("refreshed=", resData);
//     return resData;
//   }
// );
// export const deleteWeatherThunk = createAsyncThunk(
//   "delete/weatherdata",
//   async (id) => {
//     const delData = await apiRequest({ data: id, method: "DELETE" });
//     if (delData) {
//       return id;
//     }
//   }
// );

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
      })
      .addCase(addWeatherThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addWeatherThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        const temp = JSON.parse(JSON.stringify(state.weatherData));
        temp.push(action.payload);
        state.weatherData = temp;
      })
      .addCase(addWeatherThunk.rejected, (state) => {
        state.status = "failed";
        state.error = "something went wrong";
      })
      .addCase(deleteWeatherThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteWeatherThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        const temp = JSON.parse(JSON.stringify(state.weatherData));
        const dataTemp = temp.filter((tem) => tem.id !== action.payload);
        console.log(dataTemp);
        state.weatherData = dataTemp;
      })
      .addCase(deleteWeatherThunk.rejected, (state) => {
        state.status = "failed";
        state.error = "failed to delete";
      })
      .addCase(editWeatherThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editWeatherThunk.fulfilled, (state, action) => {
        state.status = "succeeded";

        // Extract the updated object from the payload
        const updatedItem = action.payload;

        // Update the specific item in the weatherData array
        state.weatherData = state.weatherData.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        );
      })
      .addCase(editWeatherThunk.rejected, (state) => {
        state.status = "failed";
        state.error = "failed to update";
      });
  },
});

export default WeatherSlice.reducer;
