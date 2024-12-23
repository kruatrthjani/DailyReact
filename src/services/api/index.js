import axios from "axios";

export const apiRequest = async (city) => {
  console.log("key=", import.meta.env.VITE_SOME_KEY);
  const key = import.meta.env.VITE_SOME_KEY;
  console.log(city);
  // const options = {
  //   method: "GET",
  //   url: `https://api.weatherstack.com/current?access_key=${key}`,
  //   params: {
  //     query: city,
  //   },
  // };

  const options = {
    method: "GET",
    url: `https://api.restful-api.dev/objects`,
  };
  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  console.log("data=", rsData);
};
