import axios from "axios";
import { LOGINURL, AUTHUSER, UPDATEUSER } from "../utils/userapi";
import { DASHBOARDURL } from "../utils/housedashboardapi";
import { WEATHERDASHBOARDURL } from "../utils/housedashboardapi";
import { Dataset } from "@mui/icons-material";
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
  const options = {
    method: "GET",
    url: DASHBOARDURL(),
    "Content-Type": "application/json ",
  };
  try {
    const response = await axios.request(options);
    const data = await response.data;

    return data;
  } catch (error) {
    throw error;

    return error;
  }
}

export async function AxiosInstanceWeatherdashboard(cords) {
  // const cities = [
  //   "-33.909176540959386,151.24717375999697",
  //   "31.024974537618093, 78.17052276217451",
  //   "23.019242, 72.535218",
  // ]; //sydney -33.909176540959386, 151.24717375999697   kedarkantha 31.024974537618093, 78.17052276217451   Ahmedabad 23.019242, 72.535218
  console.log("vhjhjhxjhbz");
  console.log(WEATHERDASHBOARDURL());
  const options = {
    method: "GET",
    url: WEATHERDASHBOARDURL(),
    headers: {
      "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
      "x-rapidapi-key": "9bbb712192mshd81eea986d82417p131f0djsna88a25cfa504",
    },
    params: {
      q: cords,
    },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
