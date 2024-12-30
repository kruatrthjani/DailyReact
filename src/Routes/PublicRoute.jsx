import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
export default function PublicRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    function redirect() {
      if (
        localStorage.getItem("accessToken") ||
        localStorage.getItem("refreshToken")
      ) {
        console.log("public");
        navigate("/user");
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
    console.log("public");
    navigate("/user");
  } else {
    console.log("navigatedIn");

    return <Outlet />;
  }
}
