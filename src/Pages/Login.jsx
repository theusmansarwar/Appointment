import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './login.css';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
     onLoginSuccess();
 
if (res.data.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/record");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };
  return (
    <div className="login">
      {loading && (
        <div className="progress">
          <div className="loader"></div>
        </div>
      )}
      <div className="form-area">
        <form onSubmit={handleLogin}>
          <h3>Admin Login</h3>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="mb-3">
            <label className="form-label">User Name</label>
            <input
              type="text" // ✅ changed from email to text
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
//  import { useNavigate } from "react-router-dom";


// //  
// import { login } from "../DAL/auth";
// import './login.css'
// const Login = ({ onLoginSuccess }) => {
//    const [username, setUsername] = useState("");
//    const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//  const [error, setError] = useState("");
//  const navigate = useNavigate();

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

   
//      try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         username,
//         password,
 
//       });

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);

//       // redirect to dashboard or record depending on role
//       if (res.data.role === "admin") {
//         navigate("/dashboard");
//       } else {
//         navigate("/record");
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || "Login failed");
//     }
//   };

//   //  try {
//   //     const res = await axios.post("http://localhost:5000/api/auth/login", {
//   //       username,
//   //       password,
 
//   //     });

//   //     localStorage.setItem("token", res.data.token);
//   //     localStorage.setItem("role", res.data.role);

//   //     // redirect to dashboard or record depending on role
//   //     if (res.data.role === "admin") {
//   //       navigate("/dashboard");
//   //     } else {
//   //       navigate("/record");
//   //     }
//   //   } 

//   //     if (result.status == 200) {
//   //       alert("Login Successful: " + result?.message);
//   //       localStorage.setItem("Token", result?.token);
//   //       onLoginSuccess();
//   //     } else {
//   //       // Login failed, show the error message from the server
//   //       alert("Login failed: " + result?.message);
//   //     }
//   //   } catch (error) {
//   //     if (error.response) {
//   //       // The server responded with a status code out of the 2xx range
//   //       console.log("<=== Api-Error ===>", error.response.data);
//   //       alert(
//   //         "Login failed: " + error.response.data.message || "An error occurred."
//   //       );
//   //     } else if (error.request) {
//   //       // The request was made, but no response was received
//   //       console.log(
//   //         "<=== Api-Request-Error ===> No response received:",
//   //         error.request
//   //       );
//   //       alert("Login failed: No response from the server.");
//   //     } else {
//   //       // Something else went wrong in setting up the request
//   //       console.log("<=== Api-Unknown-Error ===>", error.message);
//   //       alert("Login failed: " + error.message);
//   //     }
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

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
//           <div className="mb-3">
//             <label htmlFor="exampleInputEmail1" className="form-label">
//               User Name
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="exampleInputEmail1"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               aria-describedby="emailHelp"
//               variant="outlined"
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="exampleInputPassword1" className="form-label">
//               Password
//             </label>
//             <input
//               type="password"
//               className="form-control"
//               id="exampleInputPassword1"
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
// // import React, { useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // const Login = () => {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await axios.post("http://localhost:5000/api/auth/login", {
// //         username,
// //         password,
 
// //       });

// //       localStorage.setItem("token", res.data.token);
// //       localStorage.setItem("role", res.data.role);

// //       // redirect to dashboard or record depending on role
// //       if (res.data.role === "admin") {
// //         navigate("/dashboard");
// //       } else {
// //         navigate("/record");
// //       }
// //     } catch (err) {
// //       setError(err.response?.data?.error || "Login failed");
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Login</h2>
// //       {error && <p style={{ color: "red" }}>{error}</p>}
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           placeholder="Username"
// //           value={username}
// //           onChange={(e) => setUsername(e.target.value)}
// //         />
// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //         />
        
// //         <button type="submit">Login</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Login;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import './login.css';

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

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         username,
//         password,
//       });

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);

//   //     if (res.data.role === "admin") {
//   //       navigate("/dashboard");
//   //     } else {
//   //       navigate("/record");
//   //     }
//   //   } catch (err) {
//   //     setError(err.response?.data?.error || "Login failed");
//   //   } finally {
//   //     setLoading(false); // ✅
//   //   }
//   // };
// if (result.status == 200) {
//         alert("Login Successful: " + result?.message);
//         localStorage.setItem("Token", result?.token);
//         onLoginSuccess();
//       } else {
//         // Login failed, show the error message from the server
//         alert("Login failed: " + result?.message);
//       }
//     } catch (error) {
//       if (error.response) {
//         // The server responded with a status code out of the 2xx range
//         console.log("<=== Api-Error ===>", error.response.data);
//         alert(
//           "Login failed: " + error.response.data.message || "An error occurred."
//         );
//       } else if (error.request) {
//         // The request was made, but no response was received
//         console.log(
//           "<=== Api-Request-Error ===> No response received:",
//           error.request
//         );
//         alert("Login failed: No response from the server.");
//       } else {
//         // Something else went wrong in setting up the request
//         console.log("<=== Api-Unknown-Error ===>", error.message);
//         alert("Login failed: " + error.message);
//       }
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
//               type="text" // ✅ changed from email to text
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
