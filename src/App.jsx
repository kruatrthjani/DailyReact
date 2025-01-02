import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { constantRoute } from "./constants/route";
import Header from "./components/Header";
import "./App.css";
import { Box, Typography } from "@mui/material";
import Main from "./layouts/Main";
import Footer from "./components/Footer";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      navigate(constantRoute.todo);
    }
  }, []);

  return (
    <div className="">
      <div style={{ textAlign: "center" }}>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
