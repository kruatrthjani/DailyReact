import { createBrowserRouter, useNavigate } from "react-router-dom";
import App from "../App";
import Todo from "../pages/Todo";
import Counter from "../pages/Counter";
import ReduxCounter from "../pages/Reduxcounter";
import ReduxTaskManager from "../pages/ReduxTask";
import WeatherDashboard from "../pages/Weather";
import WeathForm from "../pages/Weather/WeatherForm";
import Login from "../pages/Login";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import User from "../pages/user";
import Profile from "../pages/profile";
import LogoutHandler from "../pages/user/Logout";
import { constantRoute } from "../constants/route";
import NotFound from "../pages/NotFound";

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
            path: constantRoute.ReduxTaskManager,
            element: <ReduxTaskManager />,
          },
          {
            path: constantRoute.WeatherDashboard,
            element: <WeatherDashboard />,
          },
          {
            path: constantRoute.weatherform,
            element: <WeathForm />,
          },
          {
            path: constantRoute.profile,
            element: <Profile />,
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
