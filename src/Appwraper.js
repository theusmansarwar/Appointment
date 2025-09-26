import React, { useState, useEffect } from "react";

import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./Pages/Login";

function AppWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token") // lowercase token

  );
  const navigate = useNavigate();
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setMessage({ type: "success", text: "Login Successfully" });
    navigate("/dashboard");
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      setIsAuthenticated(false);
      localStorage.removeItem("token"); // lowercase
      localStorage.removeItem("role");
      navigate("/login");
    }
  };

  return (
    <Routes>
      {!isAuthenticated && (
        <Route path="/" element={<Navigate to="/login" replace />} />
      )}
      {isAuthenticated ? (
        <Route
          path="/*"
          element={
            <App
              onLogout={handleLogout}
              message={message}
              setMessage={setMessage}
            />
          }
        />
      ) : (
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
      )}
    </Routes>

  );
}

export default AppWrapper;