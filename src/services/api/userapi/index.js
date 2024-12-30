import axios from "axios";
export async function userapi({ method, data }) {
  let url = import.meta.env.VITE_USER_API_END_POINT;
  console.log("here data=", data);
  const options = {
    method,
    url: url,
    data: method === "POST" || method == "PUT" ? data : null,
  };
  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
