import { userapi } from "../api/userapi";
import { apiRequest } from "../api/weatherapi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const LoginThunk = createAsyncThunk(
  "login/userLogin",
  async ({ username, password }) => {
    const data = {
      username,
      password,
      expiresInMins: 30,
    };
    const resData = await userapi({ method: "POST", data });

    return resData;
  }
);

export const getUserThunk = createAsyncThunk("user/userLogin", async (id) => {
  console.log("id=", id);
  const resData = await userapi({
    Authorizartion: true,
    method: "GET",
    requestType: "getuser",
    id,
  });
  console.log("res data===", resData);
  return resData;
});

export const EditUserThunk = createAsyncThunk(
  "edit/userLogin",
  async (data) => {
    const resData = await userapi({
      Authorizartion: true,
      method: "PATCH",
      requestType: "setuser",
      data,
    });

    return resData;
  }
);
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
