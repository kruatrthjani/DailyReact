import { FormControl } from "@mui/base";
import { Box, TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useMemo, useState } from "react";
import { red } from "@mui/material/colors";
import StyledInput from "../../components/StyledInput";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginThunk } from "../../redux/thunk/allthunks";
import { useSelector } from "react-redux";
import { constantRoute } from "../../constants/route";
import DangerousIcon from "@mui/icons-material/Dangerous";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setusernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData, status, error } = useSelector((state) => state.Login);
  useMemo(() => {
    function redirect() {
      if (
        localStorage.getItem("accessToken") ||
        localStorage.getItem("refreshToken")
      ) {
        navigate(constantRoute.user);
      } else {
        navigate(constantRoute.login);
      }
    }
    redirect();
  }, [dispatch, navigate, userData]);

  function formSubmitHandler() {
    event.preventDefault();

    if (password.length < 3) {
      setPasswordError(true);
    } else if (username.length < 3) {
      setusernameError(true);
    } else {
      dispatch(LoginThunk({ username, password }));
    }
  }

  return (
    <Box className="flex items-center flex-col h-screen">
      <form className="flex flex-col gap-y-3" onSubmit={formSubmitHandler}>
        <StyledInput
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />

        {usernameError && (
          <Typography className="text-red-500 ">
            {" "}
            <ErrorOutlineIcon></ErrorOutlineIcon>username must be valid
          </Typography>
        )}

        <StyledInput
          type={visibility ? "text" : "password"}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button
          sx={{
            position: "relative",
            top: "-50px",
            left: "125px",
            width: "5px",
          }}
          onClick={() => setVisibility(!visibility)}
        >
          {visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </Button>
        {passwordError && (
          <Typography className="text-red-500 ">
            <ErrorOutlineIcon></ErrorOutlineIcon>
            password must be valid
          </Typography>
        )}
        <Button sx={{ ml: 1 }} type="submit" variant="contained">
          Submit
        </Button>
      </form>
      <Typography className="text-red-600 flex">
        {error && (
          <>
            <DangerousIcon />
            <p>invalid crendetialds</p>
          </>
        )}
      </Typography>
    </Box>
  );
}
