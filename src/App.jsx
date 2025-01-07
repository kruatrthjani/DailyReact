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
  }, [location.pathname, navigate]);

  return (
    <div
      className="app-container"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/* Header */}
      <header style={{ textAlign: "center" }}>
        <Header />
      </header>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          overflow: "auto",
          paddingBottom: "60px" /* Adjust based on footer height */,
        }}
      >
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        style={{ position: "relative", bottom: 0, left: 0, width: "100%" }}
      >
        <Footer />
      </footer>
    </div>
  );
}

export default App;
