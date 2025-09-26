import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import zemaltlogo from "./Assets/zemalt-logo.png";
import personimg from "./Assets/person.png";

import Categories from "./Pages/Categories/Categories";
import Record from "./Pages/Practice/Record";
import PatientData from "./Pages/PatientData/PatientData";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AppointmentManagement from "./Pages/Appointment/AppointmentManagement";
import Report from "./Pages/Report/Report";

const App = ({ onLogout, message }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeitems, setActiveitems] = useState(null);

  // get role from localStorage
  const role = localStorage.getItem("role"); // "admin" or "doctor"

  // Sidebar items allowed by role (you can keep filtering by role if you want)
  const items = useMemo(() => {
    return [
      { id: 1, name: "Dashboard", route: "/dashboard" },
      { id: 2, name: "Categories", route: "/categories" },
      { id: 3, name: "Record", route: "/record" },
      { id: 4, name: "AppointmentManagement", route: "/appointmentmanagement" },
      { id: 5, name: "PatientData", route: "/patientdata" },
      { id: 6, name: "Report", route: "/report" },
    ];
  }, []);

  useEffect(() => {
    const currentItem = items.find((item) => item.route === location.pathname);
    setActiveitems(currentItem?.id || null);
  }, [location, items]);

  const handleitemsClick = (item) => {
    setActiveitems(item.id);
    navigate(item.route);
  };

  return (
    <div className="App">
      <div className="app-side-bar">
        <img src={zemaltlogo} className="home-zemalt-logo" alt="zemalt Logo" />
        <div className="userprofile">
          <div
            className="avatar"
            style={{
              backgroundImage: `url(${personimg})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
          <div className="avatar-data">
            <p>Profile</p>
            <h4>{role ? role.charAt(0).toUpperCase() + role.slice(1) : "User"}</h4>
          </div>
        </div>
        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              className={activeitems === item.id ? "selected-item" : "unselected"}
              onClick={() => handleitemsClick(item)}
            >
              {item.name}
            </li>
          ))}
          <li className="unselected" onClick={onLogout}>
            Logout
          </li>
        </ul>
      </div>
      <div className="app-right">
        <Routes>
          <Route path="/dashboard" element={<Dashboard key="dashboard" />} />
          <Route path="/categories" element={<Categories key="categories" />} />
          <Route path="/record" element={<Record key="record" />} />
          <Route path="/appointmentmanagement" element={<AppointmentManagement key="appointment" />} />
          <Route path="/patientdata" element={<PatientData key="patient" />} />
          <Route path="/report" element={<Report key="report" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
