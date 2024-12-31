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
            <Box>
              <Typography>Logo </Typography>
            </Box>

            <Box className="flex flex-1 justify-center gap-x-5">
              <Box
                sx={{
                  display: "flex",
                }}
              >
                {location.pathname !== "/login" && (
                  <Link
                    to="/todo"
                    className={`${
                      location.pathname === "/todo" ? "bg-black" : ""
                    } p-2  `}
                  >
                    Todo
                  </Link>
                )}
                {location.pathname !== "/login" && (
                  <Link
                    to="/counter"
                    className={`${
                      location.pathname === "/counter" ? "bg-black" : ""
                    } p-2 `}
                  >
                    counter
                  </Link>
                )}
                {location.pathname !== "/login" && (
                  <Link
                    to="/reduxcounter"
                    className={`${
                      location.pathname === "/reduxcounter" ? "bg-black" : ""
                    } p-2  `}
                  >
                    Redux Counter
                  </Link>
                )}
                {location.pathname !== "/login" && (
                  <Link
                    to="/reduxtask"
                    className={`${
                      location.pathname === "/reduxtask" ? "bg-black" : ""
                    } p-2  `}
                  >
                    Redux Task
                  </Link>
                )}
                {location.pathname !== "/login" && (
                  <Link
                    to="/reduxweather"
                    className={`${
                      location.pathname === "/reduxweather" ? "bg-black" : ""
                    } p-2  `}
                  >
                    ReduxWeather
                  </Link>
                )}
                <Link
                  to="/login"
                  className={`${
                    location.pathname === "/reduxweather" ? "bg-black" : ""
                  } p-2  `}
                >
                  Login
                </Link>
              </Box>
            </Box>
            {location.pathname !== "/login" && (
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
                  sx={{ mt: "45px" }}
                  open={Boolean(anchorEleNav)}
                  onClose={handleCloseUserMenu}
                  keepMounted
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  {settings.map((setting) => (
                    <MenuItem onClick={handleCloseUserMenu} key={setting}>
                      <Typography>
                        <Button onClick={() => navigate(setting.toLowerCase())}>
                          {setting}
                        </Button>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </span>
    </div>
  );
}
