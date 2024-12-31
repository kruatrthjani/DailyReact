import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { getUserThunk } from "../../services/thunk/allthunks";
import LogoutHandler from "./Logout";
import StyledInput from "../../components/StyledInput";
import { useDispatch, useSelector } from "react-redux";
export default function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData, status, error } = useSelector((state) => state.Login);

  /* providing accessToken in bearer */

  return (
    <>
      user data here
      {/* <Button
        variant="contained"
        onClick={() => {
          LogoutHandler();
          navigate("/login");
        }}
      >
        Logout
      </Button> */}
    </>
  );
}
