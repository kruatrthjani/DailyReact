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

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
        ],
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/user",
            element: <User />,
          },
          {
            path: "/todo",
            element: <Todo />,
          },
          {
            path: "/counter",
            element: <Counter />,
          },
          {
            path: "/reduxcounter",
            element: <ReduxCounter />,
          },
          {
            path: "/reduxTask",
            element: <ReduxTaskManager />,
          },
          {
            path: "/reduxweather",
            element: <WeatherDashboard />,
          },
          {
            path: "/weatherform",
            element: <WeathForm />,
          },
        ],
      },
    ],
  },
]);
