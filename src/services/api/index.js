import axios from "axios";

export const apiRequest = async ({ data, method }) => {
  console.log("key=", import.meta.env.VITE_SOME_KEY);
  const key = import.meta.env.VITE_SOME_KEY;

  // const options = {
  //   method: "GET",
  //   url: `https://api.weatherstack.com/current?access_key=${key}`,
  //   params: {
  //     query: city,
  //   },
  // };
  console.log("id=", data);
  let url = `https://api.restful-api.dev/objects`;
  if (method === "DELETE") {
    url = `https://api.restful-api.dev/objects/${data}`;
  } else if (method === "PUT") {
    url = `https://api.restful-api.dev/objects/${data.id}`;
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
