import { useTable } from "../../Components/Models/useTable";

const Record = () => {
  

  const attributes = [
    { id: "patientName", label: "Patient Name" },
    { id: "appointmentDate", label: "Appointment Date" },
    { id: "appointmentTime", label: " Appointment Time" },
    { id: "reason", label: "Reason for Visit" },
    { id: "prescription", label: "Prescription" },
    { id: "dues", label: "Dues (PKR)" },
        // { id: "history.name", label: "Pastvisits (PKR)" },
  ];

  // ✅ call your table hook
  const { tableUI } = useTable({
    attributes,
   
    tableType: "Record",
  });

  return (
    <>
      
      {tableUI}
    </>
  );
};

export default Record;
