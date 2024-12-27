import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Toolbar,
  Button,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
} from "@mui/material";
import { useLocation } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  const [anchorEleNav, setAnchorEleNav] = useState(false);
  const location = useLocation();
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  function handleOpenUserMenu() {
    setAnchorEleNav(true);
  }
  function handleCloseUserMenu() {
    setAnchorEleNav(false);
  }
  return (
    <div className="bg-blue-500 text-white mb-3">
      <span className="flex justify-center gap-x-5">
        <Container maxWidth="1">
          <Toolbar>
            {location.pathname === "/reduxweather" ? (
              <Button
                variant="outlined"
                color="white"
                onClick={() => navigate("/weatherform")}
              >
                <Box className="flex items-center gap-x-2 ">
                  <i className="fa-solid fa-plus "></i>{" "}
                  <p className>create New</p>
                </Box>
              </Button>
            ) : (
              ""
            )}
            <Box className="flex flex-1 justify-center gap-x-5">
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Link
                  to="/todo"
                  className={`${
                    location.pathname === "/todo" ? "bg-black" : ""
                  } p-2  `}
                >
                  Todo
                </Link>
                <Link
                  to="/counter"
                  className={`${
                    location.pathname === "/counter" ? "bg-black" : ""
                  } p-2 `}
                >
                  counter
                </Link>
                <Link
                  to="/reduxcounter"
                  className={`${
                    location.pathname === "/reduxcounter" ? "bg-black" : ""
                  } p-2  `}
                >
                  Redux Counter
                </Link>
                <Link
                  to="/reduxtask"
                  className={`${
                    location.pathname === "/reduxtask" ? "bg-black" : ""
                  } p-2  `}
                >
                  Redux Task
                </Link>
                <Link
                  to="/reduxweather"
                  className={`${
                    location.pathname === "/reduxweather" ? "bg-black" : ""
                  } p-2  `}
                >
                  ReduxWeather
                </Link>
              </Box>
            </Box>
            <Box className=" flex justify-end ">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  border: "1px solid white",
                  margin: "5px",
                  color: "white",
                }}
              >
                <i className="fa-regular fa-user m-0"></i>
              </IconButton>
              <Menu
                open={anchorEleNav}
                onClose={handleCloseUserMenu}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                {settings.map((setting) => (
                  <MenuItem onClick={handleCloseUserMenu} key={setting}>
                    <Typography>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </span>
    </div>
  );
}
