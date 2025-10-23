

// import your custom hook (similar to useTable)

import { useTable } from "../Components/Models/useTable";
const AdminAddUser = () => {
  

  const attributes = [
    { id: "name", label: "Full Name", type: "text" },
    { id: "email", label: "Email Address", type: "email" },
    { id: "password", label: "Password", type: "password" },
    {
      id: "role",
      label: "Role",
      type: "select",
      options: ["staff", "doctor", "receptionist", "admin"],
    },
    {
      id: "modules",
      label: "Allowed Modules",
      type: "checkbox",
      options: ["appointments", "patients", "reports"],
    },
  ];

 
   const { tableUI } = useTable({
    attributes,
  
   
    tableType: "User",
  });

  return <>{tableUI}</>;
};

export default AdminAddUser;
