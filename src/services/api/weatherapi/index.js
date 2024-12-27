import axios from "axios";

export const apiRequest = async ({ data, method }) => {
  // const key = import.meta.env.VITE_SOME_KEY;

  console.log("id=", data);
  console.log(typeof import.meta.env.VITE_API_END_POINT);
  let url = import.meta.env.VITE_API_END_POINT;
  if (method === "DELETE") {
    url = import.meta.env.VITE_API_END_POINT + `/${data}`; //`https://api.restful-api.dev/objects/${data}`;
  } else if (method === "PUT") {
    url = import.meta.env.VITE_API_END_POINT + `/${data.id}`; //`https://api.restful-api.dev/objects/${data.id}`;
  }
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
};
