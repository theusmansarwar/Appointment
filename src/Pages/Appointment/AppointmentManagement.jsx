import React from "react";
import { useTable } from "../../Components/Models/useTable";

const AppointmentManagement = () => {
   
  const attributes = [
   
    { id: "patientName", label: "Patient Name" },
    { id: "appointmentDate", label: "Appointment Date" },
    { id: "appointmentTime", label: "Appointment Time" },
     { id: "status", label: "Status" },
     { id: "reason", label: "Reason" },
  ];

  
  const { tableUI } = useTable({  attributes, tableType: "Appointment" });

  return <>{tableUI}</>;
};

export default AppointmentManagement  ;

