import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { constantRoute } from "../constants/route";

export default function PublicRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    function redirect() {
      if (
        localStorage.getItem("accessToken") ||
        localStorage.getItem("refreshToken")
      ) {
        navigate(constantRoute.user);
      } else {
        console.log("navigatedIn");
        return <Outlet />;
      }
    }
    redirect();
  }, []);
  if (
    localStorage.getItem("accessToken") ||
    localStorage.getItem("refreshToken")
  ) {
    navigate(constantRoute.user);
  } else {
    console.log("navigatedIn");

    return <Outlet />;
  }
}
