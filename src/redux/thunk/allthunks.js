import { apiRequest } from "../../utils/weatherapi";
import {
  AxiosInstanceUser,
  AxiosInstanceWeatherdashboard,
  AxiosInstancedashboard,
} from "../../axios/axiosInstanceuser";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const weatherDashboardThunk = createAsyncThunk(
  "dashboard/weather",
  async () => {
    const cities = [
      "-33.909176540959386,151.24717375999697",
      "31.024974537618093,78.17052276217451",
      "23.019242,72.535218",
    ];

    try {
      const resData = await Promise.all(
        cities.map(async (cords) => {
          const responseData = await AxiosInstanceWeatherdashboard(cords);
          console.log("responseData =", responseData);
          return responseData;
        })
      );

      console.log("resData =", resData);
      return resData;
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      throw new Error(error);
    }
  }
);

export const dashboardThunk = createAsyncThunk("dashboard/house", async () => {
  try {
    const resData = await AxiosInstancedashboard();
    console.log("resdata=", resData);
    return resData;
  } catch (error) {
    console.log(error);
    const errordata = {
      statuscode: error.request.status,
      message: error.message,
    };
    throw new Error(JSON.stringify(errordata));
  }
});

export const LoginThunk = createAsyncThunk(
  "login/userLogin",
  async ({ username, password }) => {
    const data = {
      username,
      password,
      expiresInMins: 30,
    };
    console.log("insert=", data);
    const resData = await AxiosInstanceUser({ method: "POST", data });
    if (!resData.ok) {
      console.log("failed");
    }

    return resData;
  }
);

export const getUserThunk = createAsyncThunk("user/userLogin", async (id) => {
  console.log("id=", id);
  const resData = await AxiosInstanceUser({
    Authorization: true,
    method: "GET",
    requestType: "getuser",
    id,
  });

  return resData;
});

export const EditUserThunk = createAsyncThunk(
  "edit/userLogin",
  async (data) => {
    const resData = await AxiosInstanceUser({
      Authorization: true,
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
