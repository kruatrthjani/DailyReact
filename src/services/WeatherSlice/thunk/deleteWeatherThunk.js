import { apiRequest } from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteWeatherThunk = createAsyncThunk(
  "delete/weatherdata",
  async (id) => {
    const delData = await apiRequest({ data: id, method: "DELETE" });
    if (delData) {
      return id;
    }
  }
);
