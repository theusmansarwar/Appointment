// // import React, { useState, useEffect } from "react";
// // import {
// //   Routes,
// //   Route,
// //   useLocation,
// //   useNavigate,
// //   Navigate,
// // } from "react-router-dom";
// // import { MdOutlineDoubleArrow, MdDashboard } from "react-icons/md";
// // import {
// //   FaCalendarCheck,
// //   FaUserInjured,
// //   FaNotesMedical,
// //   FaUsers,
// // } from "react-icons/fa";
// // import { HiDocumentReport } from "react-icons/hi";
// // import { IoLogOut } from "react-icons/io5";
// // import { HiUserGroup } from "react-icons/hi";

// // import "./App.css";
// // import zemaltlogo from "./Assets/doctor.jpg";

// // // Pages
// // import Dashboard from "./Pages/Dashboard/Dashboard";
// // import AppointmentManagement from "./Pages/Appointment/AppointmentManagement";
// // import PatientData from "./Pages/PatientData/PatientData";
// // import Record from "./Pages/Practice/Record";
// // import RecordDetailPage from "./Components/Models/RecordDetailPage";
// // import Report from "./Pages/Report/Report";
// // import User from "./Pages/User/User";
// // import Roles from "./Pages/Roles/Roles";

// // const App = ({ onLogout }) => {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const [activeItem, setActiveItem] = useState(null);
// //   const [isOpen, setIsOpen] = useState(true);
// //   const [userModules, setUserModules] = useState([]);
// //   const [isInitializing, setIsInitializing] = useState(true); // 🆕 Loading state

// //   // ✅ All available sidebar items
// //   const allItems = [
// //     { id: 1, name: "Dashboard", route: "/dashboard", icon: <MdDashboard /> },
// //     { id: 2, name: "Appointment", route: "/appointment", icon: <FaCalendarCheck /> },
// //     { id: 3, name: "PatientData", route: "/patientdata", icon: <FaUserInjured /> },
// //     { id: 4, name: "Records", route: "/records", icon: <FaNotesMedical /> },
// //     { id: 5, name: "Reports", route: "/reports", icon: <HiDocumentReport /> },
// //     { id: 6, name: "User", route: "/user", icon: <FaUsers /> },
// //     { id: 7, name: "Roles", route: "/roles", icon: <HiUserGroup /> },
// //   ];

// //   // ✅ Filter only allowed modules for sidebar
// //   const filteredItems = allItems.filter((item) =>
// //     userModules.includes(item.name)
// //   );

// //   //✅ Load user's allowed modules and handle initial navigation
// //   useEffect(() => {
// //     const storedUser = JSON.parse(localStorage.getItem("user"));
// //     if (storedUser && storedUser.role?.Modules) {
// //       setUserModules(storedUser.role.Modules);
      
// //       // 🆕 Handle initial navigation BEFORE setting isInitializing to false
// //       const currentPath = location.pathname;
      
// //       // Only redirect if on root or dashboard
// //       if (currentPath === "/" || currentPath === "/dashboard") {
// //         // Check all possible table types for saved paths
// //         const tableTypes = ["User", "Roles", "PatientData", "Record", "Appointment", "Report", "Categories"];
        
// //         let restored = false;
// //         for (const tableType of tableTypes) {
// //           const savedPath = localStorage.getItem(`${tableType}-lastPath`);
// //           if (savedPath && savedPath !== "/" && savedPath !== "/dashboard") {
// //             // Verify user has access to this module
// //             const allowedRoutes = allItems
// //               .filter(item => storedUser.role.Modules.includes(item.name))
// //               .map(item => item.route);
            
// //             const hasAccess = allowedRoutes.some(route => savedPath.includes(route));
// //             if (hasAccess) {
// //               navigate(savedPath, { replace: true });
// //               restored = true;
// //               break;
// //             }
// //           }
// //         }
        
// //         // If no saved path and user can't access dashboard, go to first allowed
// //         if (!restored && !storedUser.role.Modules.includes("Dashboard")) {
// //           const firstAllowed = allItems.find(item => 
// //             storedUser.role.Modules.includes(item.name)
// //           );
// //           if (firstAllowed) {
// //             navigate(firstAllowed.route, { replace: true });
// //           }
// //         }
// //       }
      
// //       setIsInitializing(false); // 🆕 Done loading
// //     } else {
// //       navigate("/login");
// //       setIsInitializing(false);
// //     }
// //   }, []); // Only run once on mount

// //   // ✅ Update active sidebar item when route changes
// //   useEffect(() => {
// //     if (!isInitializing) {
// //       const currentItem = filteredItems.find(
// //         (item) => item.route === location.pathname
// //       );
// //       setActiveItem(currentItem?.id || null);
// //     }
// //   }, [location.pathname, filteredItems, isInitializing]);

// //   // Sidebar toggle
// //   const toggleMenu = () => setIsOpen((prev) => !prev);

// //   // Handle click navigation
// //   const handleItemClick = (item) => {
// //     setActiveItem(item.id);
// //     navigate(item.route);
// //   };

// //   // ✅ Route protection
// //   const ProtectedElement = ({ element, moduleName }) => {
// //     if (!userModules.includes(moduleName)) {
// //       const firstAllowed = filteredItems[0]?.route || "/login";
// //       return <Navigate to={firstAllowed} replace />;
// //     }
// //     return element;
// //   };

// //   // 🆕 Show loading or blank screen while initializing
// //   if (isInitializing) {
// //     return (
// //       <div style={{
// //         display: 'flex',
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         height: '100vh',
// //         backgroundColor: '#f5f5f5'
// //       }}>
// //         {/* Optional: Add a spinner here */}
// //         <div>Loading...</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="App">
// //       {/* Sidebar */}
// //       <div className={`app-side-bar ${isOpen ? "open" : "closed"}`}>
// //         <div className="opencloseicon" onClick={toggleMenu}>
// //           <MdOutlineDoubleArrow className={isOpen ? "rotated" : ""} />
// //         </div>

// //         <img src={zemaltlogo} className="logo" alt="Clinic Logo" />

// //         <ul>
// //           {filteredItems.map((item) => (
// //             <li
// //               key={item.id}
// //               className={activeItem === item.id ? "selected-item" : "unselected"}
// //               onClick={() => handleItemClick(item)}
// //             >
// //               {item.icon}
// //               {isOpen && <span>{item.name}</span>}
// //             </li>
// //           ))}
// //           <li className="unselected" onClick={onLogout}>
// //             <IoLogOut />
// //             {isOpen && <span>Logout</span>}
// //           </li>
// //         </ul>
// //       </div>

// //       {/* Right Content */}
// //       <div className="app-right">
// //         <Routes>
// //           <Route
// //             path="/dashboard"
// //             element={<ProtectedElement element={<Dashboard />} moduleName="Dashboard" />}
// //           />
// //           <Route
// //             path="/appointment"
// //             element={<ProtectedElement element={<AppointmentManagement />} moduleName="Appointment" />}
// //           />
// //           <Route
// //             path="/patientdata"
// //             element={<ProtectedElement element={<PatientData />} moduleName="PatientData" />}
// //           />
// //           <Route
// //             path="/records"
// //             element={<ProtectedElement element={<Record />} moduleName="Records" />}
// //           />
// //           <Route
// //             path="/record/:recordId"
// //             element={<ProtectedElement element={<RecordDetailPage />} moduleName="Records" />}
// //           />
// //           <Route
// //             path="/reports"
// //             element={<ProtectedElement element={<Report />} moduleName="Reports" />}
// //           />
// //           <Route
// //             path="/user"
// //             element={<ProtectedElement element={<User />} moduleName="User" />}
// //           />
// //           <Route
// //             path="/roles"
// //             element={<ProtectedElement element={<Roles />} moduleName="Roles" />}
// //           />
// //           {/* Default Redirect */}
// //           <Route
// //             path="*"
// //             element={<Navigate to={filteredItems[0]?.route || "/login"} replace />}
// //           />
// //         </Routes>
// //       </div>
// //     </div>
// //   );
// // };

// // export default App;
// import React, { useState, useEffect } from "react";
// import {
//   Routes,
//   Route,
//   useLocation,
//   useNavigate,
//   Navigate,
// } from "react-router-dom";
// import { MdOutlineDoubleArrow, MdDashboard } from "react-icons/md";
// import {
//   FaCalendarCheck,
//   FaUserInjured,
//   FaNotesMedical,
//   FaUsers,
// } from "react-icons/fa";
// import { HiDocumentReport } from "react-icons/hi";
// import { IoLogOut } from "react-icons/io5";
// import { HiUserGroup } from "react-icons/hi";
// import { Modal, Box, Typography, Button } from "@mui/material";

// import "./App.css";
// import zemaltlogo from "./Assets/doctor.jpg";

// // Pages
// import Dashboard from "./Pages/Dashboard/Dashboard";
// import AppointmentManagement from "./Pages/Appointment/AppointmentManagement";
// import PatientData from "./Pages/PatientData/PatientData";
// import Record from "./Pages/Practice/Record";
// import RecordDetailPage from "./Components/Models/RecordDetailPage";
// import Report from "./Pages/Report/Report";
// import User from "./Pages/User/User";
// import Roles from "./Pages/Roles/Roles";

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   borderRadius: "12px",
//   p: 4,
//   textAlign: "center",
// };

// const App = ({ onLogout }) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [activeItem, setActiveItem] = useState(null);
//   const [isOpen, setIsOpen] = useState(true);
//   const [userModules, setUserModules] = useState([]);
//   const [isInitializing, setIsInitializing] = useState(true);
//   const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false); // ✅ Popup control

//   // ✅ Sidebar items
//   const allItems = [
//     { id: 1, name: "Dashboard", route: "/dashboard", icon: <MdDashboard /> },
//     { id: 2, name: "Appointment", route: "/appointment", icon: <FaCalendarCheck /> },
//     { id: 3, name: "PatientData", route: "/patientdata", icon: <FaUserInjured /> },
//     { id: 4, name: "Records", route: "/records", icon: <FaNotesMedical /> },
//     { id: 5, name: "Reports", route: "/reports", icon: <HiDocumentReport /> },
//     { id: 6, name: "User", route: "/user", icon: <FaUsers /> },
//     { id: 7, name: "Roles", route: "/roles", icon: <HiUserGroup /> },
//   ];

//   const filteredItems = allItems.filter((item) =>
//     userModules.includes(item.name)
//   );

//   // ✅ Load user modules
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser && storedUser.role?.Modules) {
//       setUserModules(storedUser.role.Modules);

//       const currentPath = location.pathname;
//       if (currentPath === "/" || currentPath === "/dashboard") {
//         const tableTypes = [
//           "User",
//           "Roles",
//           "PatientData",
//           "Record",
//           "Appointment",
//           "Report",
//           "Categories",
//         ];

//         let restored = false;
//         for (const tableType of tableTypes) {
//           const savedPath = localStorage.getItem(`${tableType}-lastPath`);
//           if (savedPath && savedPath !== "/" && savedPath !== "/dashboard") {
//             const allowedRoutes = allItems
//               .filter((item) => storedUser.role.Modules.includes(item.name))
//               .map((item) => item.route);

//             const hasAccess = allowedRoutes.some((route) =>
//               savedPath.includes(route)
//             );
//             if (hasAccess) {
//               navigate(savedPath, { replace: true });
//               restored = true;
//               break;
//             }
//           }
//         }

//         if (!restored && !storedUser.role.Modules.includes("Dashboard")) {
//           const firstAllowed = allItems.find((item) =>
//             storedUser.role.Modules.includes(item.name)
//           );
//           if (firstAllowed) {
//             navigate(firstAllowed.route, { replace: true });
//           }
//         }
//       }

//       setIsInitializing(false);
//     } else {
//       navigate("/login");
//       setIsInitializing(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (!isInitializing) {
//       const currentItem = filteredItems.find(
//         (item) => item.route === location.pathname
//       );
//       setActiveItem(currentItem?.id || null);
//     }
//   }, [location.pathname, filteredItems, isInitializing]);

//   const toggleMenu = () => setIsOpen((prev) => !prev);
//   const handleItemClick = (item) => {
//     setActiveItem(item.id);
//     navigate(item.route);
//   };

//   // ✅ Route protection
//   const ProtectedElement = ({ element, moduleName }) => {
//     if (!userModules.includes(moduleName)) {
//       const firstAllowed = filteredItems[0]?.route || "/login";
//       return <Navigate to={firstAllowed} replace />;
//     }
//     return element;
//   };

//   // ✅ Logout handlers
//   const handleLogoutClick = () => setLogoutConfirmOpen(true);
//   const handleConfirmLogout = () => {
//     setLogoutConfirmOpen(false);
//     onLogout(); // Call your logout logic
//   };
//   const handleCancelLogout = () => setLogoutConfirmOpen(false);

//   if (isInitializing) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//           backgroundColor: "#f5f5f5",
//         }}
//       >
//         <div>Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="App">
//       {/* Sidebar */}
//       <div className={`app-side-bar ${isOpen ? "open" : "closed"}`}>
//         <div className="opencloseicon" onClick={toggleMenu}>
//           <MdOutlineDoubleArrow className={isOpen ? "rotated" : ""} />
//         </div>

//         <img src={zemaltlogo} className="logo" alt="Clinic Logo" />

//         <ul>
//           {filteredItems.map((item) => (
//             <li
//               key={item.id}
//               className={activeItem === item.id ? "selected-item" : "unselected"}
//               onClick={() => handleItemClick(item)}
//             >
//               {item.icon}
//               {isOpen && <span>{item.name}</span>}
//             </li>
//           ))}
//           <li className="unselected" onClick={handleLogoutClick}>
//             <IoLogOut />
//             {isOpen && <span>Logout</span>}
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="app-right">
//         <Routes>
//           <Route path="/dashboard" element={<ProtectedElement element={<Dashboard />} moduleName="Dashboard" />} />
//           <Route path="/appointment" element={<ProtectedElement element={<AppointmentManagement />} moduleName="Appointment" />} />
//           <Route path="/patientdata" element={<ProtectedElement element={<PatientData />} moduleName="PatientData" />} />
//           <Route path="/records" element={<ProtectedElement element={<Record />} moduleName="Records" />} />
//           <Route path="/record/:recordId" element={<ProtectedElement element={<RecordDetailPage />} moduleName="Records" />} />
//           <Route path="/reports" element={<ProtectedElement element={<Report />} moduleName="Reports" />} />
//           <Route path="/user" element={<ProtectedElement element={<User />} moduleName="User" />} />
//           <Route path="/roles" element={<ProtectedElement element={<Roles />} moduleName="Roles" />} />
//           <Route path="*" element={<Navigate to={filteredItems[0]?.route || "/login"} replace />} />
//         </Routes>
//       </div>

//       {/* ✅ Logout Confirmation Modal */}
//       <Modal open={logoutConfirmOpen} onClose={handleCancelLogout}>
//         <Box sx={modalStyle}>
//           <Typography variant="h6" gutterBottom>
//             Are you sure you want to logout?
//           </Typography>
//           <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
//             <Button
//               variant="contained"
//               color="error"
//               onClick={handleConfirmLogout}
//             >
//               Yes
//             </Button>
//             <Button
//               variant="outlined"
//               color="primary"
//               onClick={handleCancelLogout}
//             >
//               No
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { MdOutlineDoubleArrow, MdDashboard } from "react-icons/md";
import {
  FaCalendarCheck,
  FaUserInjured,
  FaNotesMedical,
  FaUsers,
} from "react-icons/fa";
import { HiDocumentReport } from "react-icons/hi";
import { IoLogOut } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi";
import { Modal, Box, Typography, Button } from "@mui/material";

import "./App.css";
import zemaltlogo from "./Assets/doctor.jpg";

// Pages
import Dashboard from "./Pages/Dashboard/Dashboard";
import AppointmentManagement from "./Pages/Appointment/AppointmentManagement";
import PatientData from "./Pages/PatientData/PatientData";
import Record from "./Pages/Practice/Record";
import RecordDetailPage from "./Components/Models/RecordDetailPage";
import Report from "./Pages/Report/Report";
import User from "./Pages/User/User";
import Roles from "./Pages/Roles/Roles";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "12px",
  p: 4,
  textAlign: "center",
};

const App = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeItem, setActiveItem] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [userModules, setUserModules] = useState([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const allItems = [
    { id: 1, name: "Dashboard", route: "/dashboard", icon: <MdDashboard /> },
    { id: 2, name: "Appointment", route: "/appointment", icon: <FaCalendarCheck /> },
    { id: 3, name: "PatientData", route: "/patientdata", icon: <FaUserInjured /> },
    { id: 4, name: "Records", route: "/records", icon: <FaNotesMedical /> },
    { id: 5, name: "Reports", route: "/reports", icon: <HiDocumentReport /> },
    { id: 6, name: "User", route: "/user", icon: <FaUsers /> },
    { id: 7, name: "Roles", route: "/roles", icon: <HiUserGroup /> },
  ];

  const filteredItems = allItems.filter((item) =>
    userModules.includes(item.name)
  );

  // ✅ Load user modules
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.role?.Modules) {
      setUserModules(storedUser.role.Modules);

      const currentPath = location.pathname;
      if (currentPath === "/" || currentPath === "/dashboard") {
        const tableTypes = [
          "User",
          "Roles",
          "PatientData",
          "Record",
          "Appointment",
          "Report",
          "Categories",
        ];

        let restored = false;
        for (const tableType of tableTypes) {
          const savedPath = localStorage.getItem(`${tableType}-lastPath`);
          if (savedPath && savedPath !== "/" && savedPath !== "/dashboard") {
            const allowedRoutes = allItems
              .filter((item) => storedUser.role.Modules.includes(item.name))
              .map((item) => item.route);

            const hasAccess = allowedRoutes.some((route) =>
              savedPath.includes(route)
            );
            if (hasAccess) {
              navigate(savedPath, { replace: true });
              restored = true;
              break;
            }
          }
        }

        if (!restored && !storedUser.role.Modules.includes("Dashboard")) {
          const firstAllowed = allItems.find((item) =>
            storedUser.role.Modules.includes(item.name)
          );
          if (firstAllowed) {
            navigate(firstAllowed.route, { replace: true });
          }
        }
      }

      setIsInitializing(false);
    } else {
      navigate("/login");
      setIsInitializing(false);
    }
  }, []);

  useEffect(() => {
    if (!isInitializing) {
      const currentItem = filteredItems.find(
        (item) => item.route === location.pathname
      );
      setActiveItem(currentItem?.id || null);
    }
  }, [location.pathname, filteredItems, isInitializing]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const handleItemClick = (item) => {
    setActiveItem(item.id);
    navigate(item.route);
  };

  // ✅ Route protection
  const ProtectedElement = ({ element, moduleName }) => {
    if (!userModules.includes(moduleName)) {
      const firstAllowed = filteredItems[0]?.route || "/login";
      return <Navigate to={firstAllowed} replace />;
    }
    return element;
  };

  // ✅ Logout handlers
  const handleLogoutClick = () => setLogoutConfirmOpen(true);
  const handleConfirmLogout = () => {
    setLogoutConfirmOpen(false);
    onLogout(); // ✅ No alert, just call logout
  };
  const handleCancelLogout = () => setLogoutConfirmOpen(false);

  if (isInitializing) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Sidebar */}
      <div className={`app-side-bar ${isOpen ? "open" : "closed"}`}>
        <div className="opencloseicon" onClick={toggleMenu}>
          <MdOutlineDoubleArrow className={isOpen ? "rotated" : ""} />
        </div>

        <img src={zemaltlogo} className="logo" alt="Clinic Logo" />

        <ul>
          {filteredItems.map((item) => (
            <li
              key={item.id}
              className={activeItem === item.id ? "selected-item" : "unselected"}
              onClick={() => handleItemClick(item)}
            >
              {item.icon}
              {isOpen && <span>{item.name}</span>}
            </li>
          ))}
          <li className="unselected" onClick={handleLogoutClick}>
            <IoLogOut />
            {isOpen && <span>Logout</span>}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="app-right">
        <Routes>
          <Route path="/dashboard" element={<ProtectedElement element={<Dashboard />} moduleName="Dashboard" />} />
          <Route path="/appointment" element={<ProtectedElement element={<AppointmentManagement />} moduleName="Appointment" />} />
          <Route path="/patientdata" element={<ProtectedElement element={<PatientData />} moduleName="PatientData" />} />
          <Route path="/records" element={<ProtectedElement element={<Record />} moduleName="Records" />} />
          <Route path="/record/:recordId" element={<ProtectedElement element={<RecordDetailPage />} moduleName="Records" />} />
          <Route path="/reports" element={<ProtectedElement element={<Report />} moduleName="Reports" />} />
          <Route path="/user" element={<ProtectedElement element={<User />} moduleName="User" />} />
          <Route path="/roles" element={<ProtectedElement element={<Roles />} moduleName="Roles" />} />
          <Route path="*" element={<Navigate to={filteredItems[0]?.route || "/login"} replace />} />
        </Routes>
      </div>

      {/* ✅ Logout Confirmation Modal */}
      <Modal open={logoutConfirmOpen} onClose={handleCancelLogout}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Are you sure you want to logout?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleConfirmLogout}
            >
              Yes
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleCancelLogout}
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default App;
