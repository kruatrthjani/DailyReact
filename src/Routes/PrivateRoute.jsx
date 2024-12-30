import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
export default function PrivateRoute() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    function redirect() {
      if (
        localStorage.getItem("accessToken") ||
        localStorage.getItem("refreshToken")
      ) {
        console.log("private");
        return <Outlet />;
      } else {
        console.log("navigatedOut");
        navigate("/login");
        return;
      }
    }

    redirect();
  }, []);
  if (
    localStorage.getItem("accessToken") ||
    localStorage.getItem("refreshToken")
  ) {
    console.log("private");
    return <Outlet />;
  } else {
    console.log("navigatedOut");
  }
}
