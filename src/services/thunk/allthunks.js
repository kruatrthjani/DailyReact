import { apiRequest } from "../api/weatherapi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addWeatherThunk = createAsyncThunk(
  "add/weatherData",
  async (data) => {
    const resData = await apiRequest({ data, method: "POST" });
    console.log("res data=", resData);
    return resData;
  }
);

export const deleteWeatherThunk = createAsyncThunk(
  "delete/weatherdata",
  async (id) => {
    const delData = await apiRequest({ data: id, method: "DELETE" });
    if (delData) {
      return id;
    }
  }
);

export const editWeatherThunk = createAsyncThunk(
  "edit/weatherData",
  async ({ id, data }) => {
    console.log("updated data:", data);
    data.id = id;
    console.log("updated Id and data=", data);
    const resData = await apiRequest({ data, method: "PUT" });
    console.log("refreshed=", resData);
    return resData;
  }
);

export const weatherThunk = createAsyncThunk("fetch/WeatherData", async () => {
  const rsData = await apiRequest({ method: "GET" });
  console.log("response data=", rsData);
  return rsData;
});
