
import React, { useState, useEffect, useMemo } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./App.css";
import zemaltlogo from "./Assets/doctor.jpg";
import personimg from "./Assets/person.png";

// icons
import { MdOutlineDoubleArrow, MdDashboard } from "react-icons/md";
import { FaCalendarCheck, FaUserInjured, FaNotesMedical } from "react-icons/fa";
import { HiDocumentReport } from "react-icons/hi";
import { IoLogOut } from "react-icons/io5";
import User from "./Pages/User/User"
import ProtectedRoute from "./Components/ProtectedRoute";
import Record from "./Pages/Practice/Record";
import PatientData from "./Pages/PatientData/PatientData";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AppointmentManagement from "./Pages/Appointment/AppointmentManagement";
import Report from "./Pages/Report/Report";
import RecordDetailPage from "./Components/Models/RecordDetailPage";
import Roles from "./Pages/Roles/Roles"
const App = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeItem, setActiveItem] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const role = localStorage.getItem("role"); // "admin" or "doctor"

  // Sidebar items
  const items = useMemo(() => {
    return [
      { id: 1, name: "Dashboard", route: "/dashboard", icon: <MdDashboard /> },
      {
        id: 2,
        name: "Appointments",
        route: "/appointmentmanagement",
        icon: <FaCalendarCheck />,
      },
      {
        id: 3,
        name: "Patients Data",
        route: "/patientdata",
        icon: <FaUserInjured />,
      },
      { id: 4, name: "Records", route: "/record", icon: <FaNotesMedical /> },
      { id: 5, name: "Reports", route: "/report", icon: <HiDocumentReport /> },
       { id: 6, name: "User", route: "/user", icon: <HiDocumentReport /> },
       { id: 7, name: "Roles", route: "/roles", icon: <HiDocumentReport /> },
    ];
  }, []);

  // Set active item based on current URL
  useEffect(() => {
    const currentItem = items.find((item) => item.route === location.pathname);
    setActiveItem(currentItem?.id || null);
  }, [location, items]);

  // Sidebar toggle
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Handle click navigation
  const handleItemClick = (item) => {
    setActiveItem(item.id);
    navigate(item.route);
  };

  return (
    <div className="App">
      {/* Sidebar */}
      <div className={`app-side-bar ${isOpen ? "open" : "closed"}`}>
        {/* Toggle icon */}
        <div className="opencloseicon" onClick={toggleMenu}>
          <MdOutlineDoubleArrow className={isOpen ? "rotated" : ""} />
        </div>

        {/* Logo */}
        <img src={zemaltlogo} className="logo" alt="Clinic Logo" />

        {/* Menu Items */}
        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              className={activeItem === item.id ? "selected-item" : "unselected"}
              onClick={() => handleItemClick(item)}
            >
              {item.icon}
              {isOpen && <span>{item.name}</span>}
            </li>
          ))}
          <li className="unselected" onClick={onLogout}>
            <IoLogOut />
            {isOpen && <span>Logout</span>}
          </li>
        </ul>
      </div>

      {/* Right Content */}
      <div className="app-right">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/appointmentmanagement"
            element={<AppointmentManagement />}
          />
          <Route path="/record" element={<Record />} />
          <Route path="/record/:recordId" element={<RecordDetailPage />} />
          <Route path="/patientdata" element={<PatientData />} />
          <Route path="/report" element={<Report />} />
          <Route path="/user" element={<User />} />
           <Route path="/roles" element={<Roles />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
           
        </Routes>
      </div>
    </div>
  );
};

export default App;
// import React, { useState, useEffect, useMemo } from "react";
// import {
//   Routes,
//   Route,
//   useLocation,
//   useNavigate,
//   Navigate,
// } from "react-router-dom";
// import {
//   MdOutlineDoubleArrow,
//   MdDashboard,
// } from "react-icons/md";
// import {
//   FaCalendarCheck,
//   FaUserInjured,
//   FaNotesMedical,
// } from "react-icons/fa";
// import { HiDocumentReport } from "react-icons/hi";
// import { IoLogOut } from "react-icons/io5";
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

// const App = ({ onLogout }) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [activeItem, setActiveItem] = useState(null);
//   const [isOpen, setIsOpen] = useState(true);
//   const [userModules, setUserModules] = useState([]);

//   // ✅ All possible sidebar items
//   const allItems = [
//     { id: 1, name: "Dashboard", route: "/dashboard", icon: <MdDashboard /> },
//     { id: 2, name: "Appointment", route: "/appointmentmanagement", icon: <FaCalendarCheck /> },
//     { id: 3, name: "PatientData", route: "/patientdata", icon: <FaUserInjured /> },
//     { id: 4, name: "Records", route: "/record", icon: <FaNotesMedical /> },
//     { id: 5, name: "Reports", route: "/report", icon: <HiDocumentReport /> },
//     { id: 6, name: "User", route: "/user", icon: <HiDocumentReport /> },
//     { id: 7, name: "Roles", route: "/roles", icon: <HiDocumentReport /> },
//   ];

//   // ✅ Load user role modules from localStorage
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser && storedUser.role?.Modules) {
//       setUserModules(storedUser.role.Modules);
//     } else {
//       navigate("/login");
//     }
//   }, [navigate]);

//   // ✅ Filter allowed sidebar items based on user role
//   const filteredItems = allItems.filter((item) =>
//     userModules.includes(item.name)
//   );

//   // ✅ Auto redirect if dashboard not available
//   useEffect(() => {
//     if (filteredItems.length > 0) {
//       const onDashboard =
//         location.pathname === "/" || location.pathname === "/dashboard";
//       if (onDashboard && !userModules.includes("Dashboard")) {
//         navigate(filteredItems[0].route, { replace: true });
//       }
//     }
//   }, [filteredItems, userModules, location.pathname, navigate]);

//   // ✅ Update active item on route change
//   useEffect(() => {
//     const currentItem = filteredItems.find(
//       (item) => item.route === location.pathname
//     );
//     setActiveItem(currentItem?.id || null);
//   }, [location.pathname, filteredItems]);

//   const toggleMenu = () => setIsOpen((prev) => !prev);

//   const handleItemClick = (item) => {
//     setActiveItem(item.id);
//     navigate(item.route);
//   };

//   // ✅ Inline Protected Route
//   const ProtectedElement = ({ element, moduleName }) => {
//     if (!userModules.includes(moduleName)) {
//       const firstAllowed = filteredItems[0]?.route || "/login";
//       return <Navigate to={firstAllowed} replace />;
//     }
//     return element;
//   };

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
//           <li className="unselected" onClick={onLogout}>
//             <IoLogOut />
//             {isOpen && <span>Logout</span>}
//           </li>
//         </ul>
//       </div>

//       {/* Right Side Routes */}
//       <div className="app-right">
//         <Routes>
//           <Route
//             path="/dashboard"
//             element={<ProtectedElement element={<Dashboard />} moduleName="Dashboard" />}
//           />
//           <Route
//             path="/appointmentmanagement"
//             element={<ProtectedElement element={<AppointmentManagement />} moduleName="Appointment" />}
//           />
//           <Route
//             path="/patientdata"
//             element={<ProtectedElement element={<PatientData />} moduleName="PatientData" />}
//           />
//           <Route
//             path="/record"
//             element={<ProtectedElement element={<Record />} moduleName="Records" />}
//           />
//           <Route
//             path="/record/:recordId"
//             element={<ProtectedElement element={<RecordDetailPage />} moduleName="Records" />}
//           />
//           <Route
//             path="/report"
//             element={<ProtectedElement element={<Report />} moduleName="Reports" />}
//           />
//           <Route
//             path="/user"
//             element={<ProtectedElement element={<User />} moduleName="User" />}
//           />
//           <Route
//             path="/roles"
//             element={<ProtectedElement element={<Roles />} moduleName="Roles" />}
//           />
//           {/* Default redirect */}
//           <Route
//             path="*"
//             element={<Navigate to={filteredItems[0]?.route || "/login"} replace />}
//           />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default App;
