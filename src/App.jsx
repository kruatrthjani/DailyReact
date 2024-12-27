import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./layouts/Header";
import "./App.css";
import { Box, Typography } from "@mui/material";
import Main from "./layouts/Main";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      console.log("location");
      navigate("/todo");
    }
  }, []);

  return (
    <div className="screen">
      <div style={{ textAlign: "center" }}>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
      <Box
        sx={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          backgroundColor: "gray",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{ fontFamily: "Raleway, Arial" }}
          className="text-blue-600"
        >
          Mui
        </Typography>
      </Box>
    </div>
  );
}

export default App;
