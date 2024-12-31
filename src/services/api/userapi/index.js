import axios from "axios";
export async function userapi({ Authorizartion, method, data, requestType }) {
  let url = import.meta.env.VITE_USER_API_END_POINT;

  if (requestType == "getuser") {
    url = import.meta.env.VITE_LOGGEDINUSER_END_POINT;
  }
  if (requestType == "setuser") {
    url = import.meta.env.VITE_UPDATEUSER_API_END_POINT + "/" + data.id;
    console.log("url===", url);
  }
  console.log("auth=", Authorizartion);
  console.log("here data=", data);
  const options = {
    method,
    url: url,
    headers: {
      Authorization: Authorizartion
        ? localStorage.getItem("accessToken") ||
          localStorage.getItem("refreshToken")
        : null,
    },
    data:
      method === "POST" || method == "PUT" || method == "PATCH" ? data : null,
  };
  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
