

import { useTable } from "../../Components/Models/useTable";
// import { fetchPatients } from '../../DAL/fetch' // ✅ import helper

const PatientData = () => {
 
  const attributes = [
    { id: "name", label: "Name" },
    { id: "age", label: "Age" },
    { id: "gender", label: "Gender" },
    { id: "phone", label: "Phone" },
    { id: "address", label: "Address" },
    { id: "appointmentDate", label: " Appointment Date" },
    { id: "appointmentTime", label: " Apoointment Time" },
    { id: "reason", label: "Reason" },
  ];

  const { tableUI } = useTable({
    attributes,
   
    tableType: "Patient Data",
  });

  return <>{tableUI}</>;
};

export default PatientData;
