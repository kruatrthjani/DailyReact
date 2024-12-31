import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { constantRoute } from "../../constants/route";
export default function LogoutHandler() {
  const navigate = useNavigate();
  useEffect(() => {
    if (
      !localStorage.removeItem("accessToken") ||
      !localStorage.removeItem("refreshToken")
    ) {
      navigate(constantRoute.login);
    }
  }, []);

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  console.log("logged out");
  navigate(constantRoute.login);
}
