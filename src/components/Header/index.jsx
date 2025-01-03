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
import { styled, useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Drawer from "@mui/material/Drawer";
import { useLocation } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { constantRoute } from "../../constants/route";
import MailIcon from "@mui/icons-material/Mail";

export default function Header() {
  const drawerWidth = 240;

  const navigate = useNavigate();
  const [anchorEleNav, setAnchorEleNav] = useState(false);
  const location = useLocation();
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  function handleOpenUserMenu() {
    setAnchorEleNav(true);
  }
  function handleCloseUserMenu() {
    setAnchorEleNav(false);
  }

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  return (
    <div className="bg-blue-500 text-white mb-3">
      <span className="flex justify-center gap-x-5">
        <Container maxWidth="1">
          <Toolbar>
            <Box>
              {location.pathname !== constantRoute.login && (
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={[
                      {
                        mr: 2,
                      },
                      open && { display: "none" },
                    ]}
                  >
                    <MenuIcon />
                  </IconButton>
                </Toolbar>
              )}
            </Box>
            {location.pathname === constantRoute.login && (
              <Typography className="w-full text-center ">LOGIN</Typography>
            )}
            {/* <Box className="flex flex-1 justify-center gap-x-5">
              <Box
                sx={{
                  display: "flex",
                }}
              >
                {location.pathname !== constantRoute.login && (
                  <Link
                    to={constantRoute.todo}
                    className={`${
                      location.pathname === constantRoute.todo ? "bg-black" : ""
                    } p-2  `}
                  >
                    Todo
                  </Link>
                )}
                {location.pathname !== constantRoute.login && (
                  <Link
                    to={constantRoute.counter}
                    className={`${
                      location.pathname === constantRoute.counter
                        ? "bg-black"
                        : ""
                    } p-2 `}
                  >
                    counter
                  </Link>
                )}
                {location.pathname !== constantRoute.login && (
                  <Link
                    to={constantRoute.reduxcounter}
                    className={`${
                      location.pathname === constantRoute.reduxcounter
                        ? "bg-black"
                        : ""
                    } p-2  `}
                  >
                    Redux Counter
                  </Link>
                )}
                {location.pathname !== constantRoute.login && (
                  <Link
                    to={constantRoute.reduxTask}
                    className={`${
                      location.pathname === constantRoute.reduxTask
                        ? "bg-black"
                        : ""
                    } p-2  `}
                  >
                    Redux Task
                  </Link>
                )}
                {location.pathname !== constantRoute.login && (
                  <Link
                    to={constantRoute.reduxweather}
                    className={`${
                      location.pathname === constantRoute.reduxweather
                        ? "bg-black"
                        : ""
                    } p-2  `}
                  >
                    ReduxDevice
                  </Link>
                )}
                <Link
                  to={constantRoute.login}
                  className={`${
                    location.pathname === constantRoute.login ? "bg-black" : ""
                  } p-2  `}
                >
                  Login
                </Link>
              </Box>
            </Box> */}
            {location.pathname !== constantRoute.login && (
              <Box className=" flex justify-end ">
                {/* <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    border: "1px solid white",
                    margin: "5px",
                    color: "white",
                  }}
                >
                  <i className="fa-regular fa-user m-0"></i>
                </IconButton> */}
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
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            constantRoute.todo,
            constantRoute.counter,
            constantRoute.reduxcounter,
            constantRoute.reduxTask,
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <Button
                  onClick={() => {
                    navigate(text);
                    handleDrawerClose();
                  }}
                  sx={{ textTransform: "capitalize" }}
                >
                  {text.replace("/", "")}
                </Button>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[
            constantRoute.reduxdevice,
            constantRoute.profile,
            constantRoute.housedashboard,
            constantRoute.logout,
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <Button
                  onClick={() => {
                    navigate(text);
                    handleDrawerClose();
                  }}
                  sx={{ textTransform: "capitalize" }}
                >
                  {text.replace("/", "")}
                </Button>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
