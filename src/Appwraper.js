import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./Pages/Login";

function AppWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token") // lowercase token
=======
import { Routes, Route, useNavigate } from "react-router-dom";

import axios from "axios";
import App from "./App";
import Login from "./Pages/Login";
function AppWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("Token")
>>>>>>> 109c5ad261df44b694cde745048932f8fe2fed6c
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

<<<<<<< HEAD
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
=======
  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      setIsAuthenticated(false);
      localStorage.removeItem("Token");
      navigate("");
    }
  };
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);
  return (
    <>
      <Routes>
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
    </>
>>>>>>> 109c5ad261df44b694cde745048932f8fe2fed6c
  );
}

export default AppWrapper;
<<<<<<< HEAD


// import React, { useState, useEffect } from "react";
// import { Routes, Route, useNavigate } from "react-router-dom";


// import App from "./App";
// import Login from "./Pages/Login";
// function AppWrapper() {
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     localStorage.getItem("token")
//   );
//   const navigate = useNavigate();
//   const [message, setMessage] = useState({ type: "", text: "" });

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login");
//     }
//   }, [isAuthenticated, navigate]);

//   const handleLoginSuccess = () => {
//     setIsAuthenticated(true);
//     setMessage({ type: "success", text: "Login Successfully" });
//     navigate("/dashboard");
//   };

//   const handleLogout = async () => {
//     const confirmed = window.confirm("Are you sure you want to log out?");
//     if (confirmed) {
//       setIsAuthenticated(false);
//       localStorage.removeItem("token");
//       navigate("");
//     }
//   };
//   useEffect(() => {
//     if (message.text) {
//       const timer = setTimeout(() => {
//         setMessage({ type: "", text: "" });
//       }, 5000);

//       return () => clearTimeout(timer);
//     }
//   }, [message, setMessage]);
//   return (
//     <>
    
//       <Routes>
//         {isAuthenticated ? (
//           <Route
//             path="/*"
//             element={
//               <App
//                 onLogout={handleLogout}
//                 message={message}
//                 setMessage={setMessage}
//               />
//             }
//           />
//         ) : (
//           <Route
//             path="/login"
//             element={<Login onLoginSuccess={handleLoginSuccess} />}
//           />
//         )}
//       </Routes>
//     </>
//   );
// }

// export default AppWrapper;
=======
>>>>>>> 109c5ad261df44b694cde745048932f8fe2fed6c
