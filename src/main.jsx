import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/routes.jsx";
import { useState, createContext } from "react";
import "./styles/index.css";
import store from "./services/store/store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";

export const TaskContext = createContext();
const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

createRoot(document.getElementById("root")).render(
  <TaskProvider>
    <Provider store={store}>
      <RouterProvider router={routes}>
        <App />
      </RouterProvider>
    </Provider>
  </TaskProvider>
);
