// // 
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./login.css";

// const Login = ({ onLoginSuccess }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const savedUsername = localStorage.getItem("username");
//     const savedPassword = localStorage.getItem("password");
//     if (savedUsername && savedPassword) {
//       setUsername(savedUsername);
//       setPassword(savedPassword);
//     }
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const res = await axios.post("http://192.168.0.108:5000/api/auth/login", {
//         username,
//         password,
//       });

//       // Save token and role
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);

//       // Notify parent
//       onLoginSuccess();

//       // Redirect based on role
//       if (res.data.role === "admin") {
//         navigate("/dashboard");
//       } else {
//         navigate("/record");
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login">
//       {loading && (
//         <div className="progress">
//           <div className="loader"></div>
//         </div>
//       )}
//       <div className="form-area">
//         <form onSubmit={handleLogin}>
//           <h3>Admin Login</h3>
//           {error && <p style={{ color: "red" }}>{error}</p>}

//           <div className="mb-3">
//             <label className="form-label">User Name</label>
//             <input
//               type="text"
//               className="form-control"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <button type="submit" className="btn btn-primary">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Paper, CircularProgress } from "@mui/material";
import { login } from "../DAL/auth";
import logo from "../Assets/bg2.jpg";
import './login.css'
import { useAlert } from "../Components/Alert/AlertContext";
import axios from "axios";


const Login = ({ onLoginSuccess }) => {
   const { showAlert } = useAlert(); 
 const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");
    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
    }
  }, []);

// const handleLogin = async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   const formData = new FormData();
//   formData.append("username", username);
//   formData.append("password", password);

//   try {
//     const result = await login(formData);

//     if (result.status === 200) {
//       showAlert("success", result?.message || "Login successful!");
//       localStorage.setItem("Token", result?.token);
//       localStorage.setItem("user", JSON.stringify(result?.data));
//       onLoginSuccess();
//     } else {
//       showAlert("error", result?.message || "Login failed.");
//     }
//   } catch (error) {
//     if (error.response) {
//       showAlert("error", error.response.data.message || "An error occurred.");
//     } else if (error.request) {
//       showAlert("error", "No response from the server.");
//     } else {
//       showAlert("error", error?.message || "Unexpected error occurred.");
//     }
//   } finally {
//     setLoading(false);
//   }
// };

const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const result = await axios.post(
      "http://192.168.0.106:5000/api/auth/login",
      { username, password },
      { headers: { "Content-Type": "application/json" } }
    );

     localStorage.setItem("token", result.data.token);
      localStorage.setItem("role", result.data.role);
    console.log("Response:", result.data);

    if (result.status === 200 && result.data?.token) {
      showAlert("success", result.data?.message || "Login successful!");
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user || {}));
      onLoginSuccess();
    } else {
      showAlert("error", result.data?.message || "Login failed.");
    }
  } catch (error) {
    console.error(error);
    if (error.response) {
      showAlert("error", error.response.data.message || "An error occurred.");
    } else if (error.request) {
      showAlert("error", "No response from the server.");
    } else {
      showAlert("error", error?.message || "Unexpected error occurred.");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <Box
    className="login"
   
    >
      {loading && (
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            position: "absolute",
            top: "20px",
            color: "primary.main",
          }}
        />
      )}

      <Paper
        elevation={6}
        sx={{
          width: 350,
          p: 3,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Box component="form" onSubmit={handleLogin}>
          <Box
            component="img"
            src={logo}
            alt="digitalaura"
            sx={{
              width: "30%",
              display: "block",
              mx: "auto",
              my: 3,
            }}
          />

          <Typography variant="h5" gutterBottom>
            Admin Login
          </Typography>

          <TextField
            fullWidth
            type="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              py: 1.2,
              borderRadius: "6px",
              backgroundColor: "var(--background-color)",
              "&:hover": {
                backgroundColor: "var(--background-color)",
                opacity: 0.9,
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;









