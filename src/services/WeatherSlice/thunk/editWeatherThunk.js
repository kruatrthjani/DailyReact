import { apiRequest } from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
