
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

import ProtectedRoute from "./Components/ProtectedRoute";
import Record from "./Pages/Practice/Record";
import PatientData from "./Pages/PatientData/PatientData";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AppointmentManagement from "./Pages/Appointment/AppointmentManagement";
import Report from "./Pages/Report/Report";
import RecordDetailPage from "./Components/Models/RecordDetailPage";

const App = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeItem, setActiveItem] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const role = localStorage.getItem("role"); // "admin" or "doctor"

  // Define which routes each role can access
  const rolePermissions = {
    admin: [
      "/dashboard",
      "/appointmentmanagement",
      "/patientdata",
      "/record",
      "/report",
    ],
    doctor: ["/dashboard", "/appointmentmanagement", "/patientdata", "/record"],
  };

  // Sidebar items
  const items = useMemo(() => {
    const allItems = [
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
    ];
    const allowedRoutes = rolePermissions[role] || [];
    return allItems.filter((item) => allowedRoutes.includes(item.route));
  }, [role]);

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
            element={
              <ProtectedRoute
                element={<AppointmentManagement />}
                allowedRoles={["admin", "doctor"]}
                role={role}
              />
            }
          />
          <Route
            path="/record"
            element={
              <ProtectedRoute
                element={<Record />}
                allowedRoles={["admin", "doctor"]}
                role={role}
              />
            }
          />
          <Route path="/record/:recordId" element={<RecordDetailPage />} />
          <Route
            path="/patientdata"
            element={
              <ProtectedRoute
                element={<PatientData />}
                allowedRoles={["admin", "doctor"]}
                role={role}
              />
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute
                element={<Report />}
                allowedRoles={["admin"]}
                role={role}
              />
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
