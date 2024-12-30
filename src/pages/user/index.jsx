import { useEffect } from "react";
import Button from "../../components/Button";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
export default function User() {
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   function redirect() {
  //     if (
  //       !localStorage.getItem("accessToken") ||
  //       !localStorage.getItem("refreshToken")
  //     ) {
  //       navigate("/login");
  //     } else {
  //       navigate("/user");
  //     }
  //   }
  //   redirect();
  // }, [location.pathname]);

  function LogoutHandler() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  }

  return (
    <>
      <p>user is here</p>
      <Button
        variant="contained"
        onClick={() => {
          LogoutHandler();
        }}
      >
        Logout
      </Button>
    </>
  );
}
