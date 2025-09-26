import React from "react";
import { useTable } from "../../Components/Models/useTable";
// dailyReports.js
const Report = () => {



const attributes = [
  { id: "reportDate", label: "Date" },
  { id: "totalAppointments", label: "Total Appointments" },
  { id: "patientsSeen", label: "Patients Seen" },
  { id: "cancelled", label: "Cancelled" },
  { id: "noShow", label: "No-Show" },
  { id: "totalRevenue", label: "Revenue (PKR)" },
  { id: "prescriptionsGiven", label: "Prescriptions" },
  { id: "commonDiseases", label: "Common Diseases" }
];


  const { tableUI } = useTable({
    attributes,
   
    tableType: "Report",
  });

  return <>{tableUI}</>;
}

export default Report ;