
// import React, { useState, useEffect } from "react";
// import { Box, Button, TextField, Typography, Paper, CircularProgress } from "@mui/material";
// import { login } from "../DAL/auth";
// import logo from "../Assets/doctor.jpg";
// import './login.css'
// import { useAlert } from "../Components/Alert/AlertContext";
// import axios from "axios";


// const Login = ({ onLoginSuccess }) => {
//    const { showAlert } = useAlert(); 
//  const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const savedUsername = localStorage.getItem("username");
//     const savedPassword = localStorage.getItem("password");
//     if (savedUsername && savedPassword) {
//       setUsername(savedUsername);
//       setPassword(savedPassword);
//     }
//   }, []);


// const handleLogin = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   const formData = new FormData();
//   formData.append("username", username);
//   formData.append("password", password);

//   try {
//       const result = await login(formData);

//      localStorage.setItem("token", result.token);
//       // localStorage.setItem("role", result.role);
//     console.log("Response:", result);

//     if (result.status === 200 && result?.token) {
//       showAlert("success", result?.message || "Login successful!");
//       localStorage.setItem("token", result.token);
//       localStorage.setItem("user", JSON.stringify(result.users || {}));
//       onLoginSuccess();
//     } else {
//       showAlert("error", result?.message || "Login failed.");
//     }
//   } catch (error) {
//     console.error(error);
//     if (error.response) {
//       showAlert("error", error.response.message || "An error occurred.");
//     } else if (error.request) {
//       showAlert("error", "No response from the server.");
//     } else {
//       showAlert("error", error?.message || "Unexpected error occurred.");
//     }
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <Box
//     className="login"
   
//     >
//       {loading && (
//         <CircularProgress
//           size={60}
//           thickness={4}
//           sx={{
//             position: "absolute",
//             top: "20px",
//             color: "primary.main",
//           }}
//         />
//       )}

//       <Paper
//         elevation={6}
//         sx={{
//           width: 350,
//           p: 3,
//           borderRadius: 2,
//           textAlign: "center",
//         }}
//       >
//         <Box component="form" onSubmit={handleLogin}>
//           <Box
//             component="img"
//             src={logo}
//             alt="digitalaura"
//             sx={{
//               width: "30%",
//               display: "block",
//               mx: "auto",
//               my: 3,
//             }}
//           />

//           <Typography variant="h5" gutterBottom>
//             Admin Login
//           </Typography>

//           <TextField
//             fullWidth
//             type="username"
//             label="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             margin="normal"
//           />

//           <TextField
//             fullWidth
//             type="password"
//             label="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             margin="normal"
//           />

//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{
//               mt: 2,
//               py: 1.2,
//               borderRadius: "6px",
//               backgroundColor: "var(--background-color)",
//               "&:hover": {
//                 backgroundColor: "var(--background-color)",
//                 opacity: 0.9,
//               },
//             }}
//           >
//             Submit
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default Login;





import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { login } from "../DAL/auth";
import logo from "../Assets/doctor.jpg";
import "./login.css";
import { useAlert } from "../Components/Alert/AlertContext";

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const result = await login(formData);
      console.log("Response:", result);

      if (result.status === 200 && result?.token) {
        showAlert("success", result?.message || "Login successful!");
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.users || {}));
        onLoginSuccess();
      } else {
        showAlert("error", result?.message || "Login failed.");
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        showAlert("error", error.response.message || "An error occurred.");
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
    <Box className="login">
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
            disabled={loading}
            sx={{
              mt: 2,
              py: 1.2,
              borderRadius: "6px",
              backgroundColor: "var(--background-color)",
              "&:hover": {
                backgroundColor: "var(--background-color)",
                opacity: 0.9,
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            {loading && (
              <CircularProgress
                size={20}
                thickness={4}
                sx={{
                  color: "white",
                }}
              />
            )}
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;




