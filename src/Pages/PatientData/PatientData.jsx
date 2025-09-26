

import { useTable } from "../../Components/Models/useTable";
// import { fetchPatients } from '../../DAL/fetch' // ✅ import helper

const PatientData = () => {
 
  const attributes = [
    { id: "name", label: "Name" },
    { id: "age", label: "Age" },
    { id: "gender", label: "Gender" },
    { id: "phone", label: "Phone" },
    { id: "address", label: "Address" },
    { id: "date", label: "Date" },
    { id: "time", label: "Time" },
    { id: "reason", label: "Reason" },
  ];

  const { tableUI } = useTable({
    attributes,
   
    tableType: "PatientData",
  });

  return <>{tableUI}</>;
};

export default PatientData;
