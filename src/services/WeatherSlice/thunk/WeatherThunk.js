import { apiRequest } from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const weatherThunk = createAsyncThunk("fetch/WeatherData", async () => {
  const rsData = await apiRequest({ method: "GET" });
  console.log("response data=", rsData);
  return rsData;
});
