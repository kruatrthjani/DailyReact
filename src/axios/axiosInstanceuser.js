import axios from "axios";
import { LOGINURL, AUTHUSER, UPDATEUSER } from "../utils/userapi";
import { DASHBOARDURL } from "../utils/housedashboardapi";
export async function AxiosInstanceUser({
  method,
  Authorization,
  data,
  requestType,
}) {
  let url = "";

  if (method === "POST") {
    url = LOGINURL();
    console.log("url is=", url);
    return Request({ method, Authorization, url, data });
  } else if (method === "GET") {
    url = AUTHUSER();

    return Request({ method, Authorization, url, data });
  } else if (method === "PATCH") {
    if (requestType == "setuser") {
      url = UPDATEUSER(data.id);
      console.log("url===", url);
    }
    return Request({ method, Authorization, url, data });
  }
  async function Request({ method, Authorization, url, data }) {
    const options = {
      method,
      url: url,
      headers: {
        Authorization: Authorization
          ? localStorage.getItem("accessToken") ||
            localStorage.getItem("refreshToken")
          : null,
      },
      data:
        method === "POST" || method === "PATCH" || method === "PUT"
          ? data
          : null,
    };
    try {
      console.log("option=", options);
      const response = await axios.request(options);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export async function AxiosInstancedashboard() {
  const options = { method: "GET", url: DASHBOARDURL() };
  try {
    const response = await axios.request(options);
    const data = await response.data;

    return data;
  } catch (error) {
    console.error(error);
  }
}
