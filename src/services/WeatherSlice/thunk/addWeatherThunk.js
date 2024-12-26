import { apiRequest } from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addWeatherThunk = createAsyncThunk(
  "add/weatherData",
  async (data) => {
    const resData = await apiRequest({ data, method: "POST" });
    console.log("res data=", resData);
    return resData;
  }
);
