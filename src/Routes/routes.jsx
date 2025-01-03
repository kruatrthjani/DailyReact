import { createBrowserRouter, useNavigate } from "react-router-dom";
import App from "../App";
import Todo from "../pages/Todo/index";
import Counter from "../pages/Counter";
import ReduxCounter from "../pages/Reduxcounter";
import ReduxTaskManager from "../pages/ReduxTask";
import DeviceDashboard from "../pages/Device/index";
import DeviceForm from "../pages/Device/DeviceForm";
import Login from "../pages/Login";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import User from "../pages/user";
import Profile from "../pages/profile";
import LogoutHandler from "../pages/user/Logout";
import { constantRoute } from "../constants/route";
import NotFound from "../pages/NotFound";
import HouseDashboard from "../pages/Dashboard";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            path: constantRoute.login,
            element: <Login />,
          },
        ],
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: constantRoute.user,
            element: <User />,
          },
          {
            path: constantRoute.todo,
            element: <Todo />,
          },
          {
            path: constantRoute.counter,
            element: <Counter />,
          },
          {
            path: constantRoute.reduxcounter,
            element: <ReduxCounter />,
          },
          {
            path: constantRoute.reduxTask,
            element: <ReduxTaskManager />,
          },
          {
            path: constantRoute.reduxdevice,
            element: <DeviceDashboard />,
          },
          {
            path: constantRoute.deviceform,
            element: <DeviceForm />,
          },
          {
            path: constantRoute.profile,
            element: <Profile />,
          },
          {
            path: constantRoute.housedashboard,
            element: <HouseDashboard />,
          },
          {
            path: constantRoute.logout,
            element: <LogoutHandler />,
          },
        ],
      },
    ],
  },
  {
    path: constantRoute.notfound,
    element: <NotFound />,
  },
]);
