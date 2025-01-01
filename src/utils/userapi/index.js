import axios from "axios";

export const LOGINURL = () => {
  const url = import.meta.env.VITE_USER_API_END_POINT + "auth/login";
  console.log("url is=", url);
  return url;
};
export const AUTHUSER = () => {
  const url = import.meta.env.VITE_USER_API_END_POINT + "user/me";
  return url;
};
export const UPDATEUSER = (id) => {
  const url = import.meta.env.VITE_USER_API_END_POINT + "users/" + id;
  return url;
};
