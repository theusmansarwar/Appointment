
// // // import React, { useEffect, useState } from "react";
// // // import {
// // //   Modal,
// // //   Box,
// // //   Typography,
// // //   TextField,
// // //   Button,
// // // } from "@mui/material";
// // // import axios from "axios"; // ✅ add axios

// // // import { createRecord } from "../../DAL/create";
// // // import { formatDate } from "../../Utils/Formatedate";

// // // const style = {
// // //   position: "absolute",
// // //   top: "50%",
// // //   left: "50%",
// // //   transform: "translate(-50%, -50%)",
// // //   width: "50%",
// // //   bgcolor: "background.paper",
// // //   boxShadow: 24,
// // //   p: 4,
// // //   borderRadius: "12px",
// // // };

// // // export default function AddRecord({
// // //   open,
// // //   setOpen,
// // //   Modeltype,
// // //   Modeldata,
// // //   onResponse,
// // // }) {
// // //   const [patientName, setPatientName] = useState("");
// // //   const [appointmentDate, setAppointmentDate] = useState("");
// // //   const [appointmentTime, setAppointmentTime] = useState("");
// // //   const [reason, setReason] = useState("");
// // //   const [prescription, setPrescription] = useState("");
// // //   const [dues, setDues] = useState("");

// // //   useEffect(() => {
// // //     console.log("incomig model data",Modeldata)
// // //     if (Modeldata) {
// // //       setPatientName(Modeldata.patientName || "");
// // //     //    setAppointmentDate(
// // //     //   Modeldata.appointmentDate
// // //     //     ? new Date(Modeldata.appointmentDate).toISOString().split("T")[0]
// // //     //     : ""
// // //     // );
// // // setAppointmentDate(formatDate(Modeldata.appointmentDate, "form"));

// // //       setAppointmentTime(Modeldata.appointmentTime || "");
// // //       setReason(Modeldata.reason || "");
// // //       setPrescription(Modeldata.prescription || "");
// // //       setDues(Modeldata.dues || "");
// // //     } else {
// // //       // clear fields for Add
// // //       setPatientName("");
// // //       setAppointmentDate("");
// // //       setAppointmentTime("");
// // //       setReason("");
// // //       setPrescription("");
// // //       setDues("");
// // //     }
// // //   }, [Modeldata]);

// // //   const handleClose = () => setOpen(false);

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try{

// // //     const payload = {
// // //       patientName,
// // //       appointmentDate: appointmentDate ? new Date(appointmentDate) : null,
// // //       appointmentTime,
// // //       reason,
// // //       prescription,
// // //       dues,
// // //     };

   
// // //          if (Modeltype === "Add") {
// // //            // 🔹 Call DAL createPatient
// // //            const res = await createRecord(payload);
// // //    if(res.status==200){

// // //    }
// // //    else if(res.missingFields){
// // //     onResponse({
// // //              messageType: "error",
// // //              message: res?.message || "Record added",
// // //              data: res?.data || payload,
// // //            });

// // //    }
// // //            onResponse({
// // //              messageType: "success",
// // //              message: res?.message || "Record added",
// // //              data: res?.data || payload,
// // //            });
// // //           }
// // //         //  } else {
// // //         //    // 🔹 Call DAL updatePatient (pass id from Modeldata)
// // //         //    const res = await updateRecord(Modeldata._id, payload);
   
// // //         //    onResponse({
// // //         //      messageType: "success",
// // //         //      message: res?.message || "Record updated",
// // //         //      data: res?.data || payload,
// // //         //    });
// // //         //  }
// // //          setOpen(false);
// // //        } catch (err) {
// // //          console.error(err);
// // //          onResponse({
// // //            messageType: "error",
// // //            message: "Error saving Record",
// // //          });
// // //        }
// // //      };
   
// // //   return (
// // //     <Modal open={open} onClose={handleClose}>
// // //       <Box sx={style} component="form" onSubmit={handleSubmit}>
// // //         <Typography variant="h6" gutterBottom>
// // //           {Modeltype} Record
// // //         </Typography>

// // //         <TextField
// // //           fullWidth
// // //           label="Patient Name"
// // //           value={patientName}
// // //           onChange={(e) => setPatientName(e.target.value)}
// // //           sx={{ mb: 2 }}
// // //         />

// // //         <TextField
// // //           fullWidth
// // //           type="date"
// // //           label=" Appointment Date"
// // //           InputLabelProps={{ shrink: true }}
// // //           value={appointmentDate}
// // //           onChange={(e) => setAppointmentDate(e.target.value)}
// // //           sx={{ mb: 2 }}
// // //         />

// // //         <TextField
// // //           fullWidth
// // //           type="time"
// // //           label="Appointment Time"
// // //           InputLabelProps={{ shrink: true }}
// // //           value={appointmentTime}
// // //           onChange={(e) => setAppointmentTime(e.target.value)}
// // //           sx={{ mb: 2 }}
// // //         />

// // //         <TextField
// // //           fullWidth
// // //           label="Reason "
// // //           value={reason}
// // //           onChange={(e) => setReason(e.target.value)}
// // //           sx={{ mb: 2 }}
// // //         />

// // //         <TextField
// // //           fullWidth
// // //           label="Prescription"
// // //           value={prescription}
// // //           onChange={(e) => setPrescription(e.target.value)}
// // //           sx={{ mb: 2 }}
// // //         />

// // //         <TextField
// // //           fullWidth
// // //           type="number"
// // //           label="Dues"
// // //           value={dues}
// // //           onChange={(e) => setDues(e.target.value)}
// // //           sx={{ mb: 2 }}
// // //         />

// // //         <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
// // //           <Button
// // //             onClick={handleClose}
// // //             sx={{ background: "#B1B1B1" }}
// // //             variant="contained"
// // //           >
// // //             Cancel
// // //           </Button>
// // //           <Button
// // //             type="submit"
            
// // //             variant="contained"
// // //             sx={{ background: "#B22222" }}
// // //           >
// // //             Submit
// // //           </Button>
// // //         </Box>
// // //       </Box>
// // //     </Modal>
// // //   );
// // // }

// // import React, { useEffect, useState } from "react";
// // import {
// //   Modal,
// //   Box,
// //   Typography,
// //   TextField,
// //   Button,
// //   FormHelperText,
// // } from "@mui/material";
// // import { createRecord } from "../../DAL/create";
// // import { updateRecord } from "../../DAL/edit";
// // import { formatDate } from "../../Utils/Formatedate";

// // const style = {
// //   position: "absolute",
// //   top: "50%",
// //   left: "50%",
// //   transform: "translate(-50%, -50%)",
// //   width: "60%",
// //   bgcolor: "background.paper",
// //   boxShadow: 24,
// //   p: 4,
// //   borderRadius: "12px",
// // };

// // export default function AddRecord({
// //   open,
// //   setOpen,
// //   Modeltype,
// //   Modeldata,
// //   onResponse,
// // }) {
// //   const [patientName, setPatientName] = useState("");
// //   const [appointmentDate, setAppointmentDate] = useState("");
// //   const [appointmentTime, setAppointmentTime] = useState("");
// //   const [reason, setReason] = useState("");
// //   const [prescription, setPrescription] = useState("");
// //   const [dues, setDues] = useState("");
// //   const [errors, setErrors] = useState({});

// //   // 🧩 Prefill or reset fields
// //   useEffect(() => {
// //     if (Modeldata) {
// //       setPatientName(Modeldata.patientName || "");
// //       setAppointmentDate(formatDate(Modeldata.appointmentDate, "form"));
// //       setAppointmentTime(Modeldata.appointmentTime || "");
// //       setReason(Modeldata.reason || "");
// //       setPrescription(Modeldata.prescription || "");
// //       setDues(Modeldata.dues || "");
// //     } else {
// //       setPatientName("");
// //       setAppointmentDate("");
// //       setAppointmentTime("");
// //       setReason("");
// //       setPrescription("");
// //       setDues("");
// //     }
// //     setErrors({});
// //   }, [Modeldata]);

// //   const handleClose = () => setOpen(false);

// //   // ✅ Frontend validation
// //   const validateFields = () => {
// //     const newErrors = {};
// //     if (!patientName.trim()) newErrors.patientName = "Patient name is required.";
// //     if (!appointmentDate)
// //       newErrors.appointmentDate = "Appointment date is required.";
// //     if (!appointmentTime)
// //       newErrors.appointmentTime = "Appointment time is required.";
// //     if (!reason.trim()) newErrors.reason = "Reason is required.";
// //     if (!prescription.trim())
// //       newErrors.prescription = "Prescription is required.";
// //     if (!dues || isNaN(dues) || Number(dues) < 0)
// //       newErrors.dues = "Valid dues amount required.";

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   // ✅ Submit handler
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!validateFields()) return;

// //     const payload = {
// //       patientName,
// //       appointmentDate: appointmentDate ? new Date(appointmentDate) : null,
// //       appointmentTime,
// //       reason,
// //       prescription,
// //       dues,
// //     };

// //     try {
// //       let response;
// //       if (Modeltype === "Add") {
// //         response = await createRecord(payload);
// //       } else {
// //         response = await updateRecord(Modeldata._id, payload);
// //       }

// //       // ✅ Success
// //       if (response?.status === 200 || response?.status === 201) {
// //         onResponse({
// //           messageType: "success",
// //           message:
// //             response.message ||
// //             `Record ${Modeltype === "Add" ? "added" : "updated"} successfully.`,
// //           data: response.data || payload,
// //         });
// //         setErrors({});
// //         setOpen(false); // 🎯 Close popup after success
// //       }
// //       // ⚠️ Backend validation error
// //       else if (response?.status === 400 && response?.missingFields) {
// //         const fieldErrors = {};
// //         response.missingFields.forEach((f) => {
// //           fieldErrors[f.field] = f.message;
// //         });
// //         setErrors(fieldErrors);
// //       }
// //       // ❌ Other API errors
// //       else {
// //         onResponse({
// //           messageType: "error",
// //           message: response?.message || "Failed to save record",
// //         });
// //       }
// //     } catch (err) {
// //       console.error("❌ Error saving record:", err);
// //       onResponse({
// //         messageType: "error",
// //         message: err.response?.data?.message || "Server error",
// //       });
// //     }
// //   };

// //   return (
// //     <Modal open={open} onClose={handleClose}>
// //       <Box sx={style}>
// //         <Typography variant="h6" gutterBottom>
// //           {Modeltype} Record
// //         </Typography>

// //         <form onSubmit={handleSubmit}>
// //           {/* Patient Name */}
// //           <TextField
// //             fullWidth
// //             label="Patient Name"
// //             value={patientName}
// //             onChange={(e) => setPatientName(e.target.value)}
// //             error={!!errors.patientName}
// //             helperText={errors.patientName}
// //             sx={{ mb: 2 }}
// //           />

// //           {/* Appointment Date + Time */}
// //           <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
// //             <TextField
// //               fullWidth
// //               type="date"
// //               label="Appointment Date"
// //               InputLabelProps={{ shrink: true }}
// //               value={appointmentDate}
// //               onChange={(e) => setAppointmentDate(e.target.value)}
// //               error={!!errors.appointmentDate}
// //               helperText={errors.appointmentDate}
// //             />
// //             <TextField
// //               fullWidth
// //               type="time"
// //               label="Appointment Time"
// //               InputLabelProps={{ shrink: true }}
// //               value={appointmentTime}
// //               onChange={(e) => setAppointmentTime(e.target.value)}
// //               error={!!errors.appointmentTime}
// //               helperText={errors.appointmentTime}
// //             />
// //           </Box>

// //           {/* Reason */}
// //           <TextField
// //             fullWidth
// //             label="Reason"
// //             value={reason}
// //             onChange={(e) => setReason(e.target.value)}
// //             error={!!errors.reason}
// //             helperText={errors.reason}
// //             sx={{ mb: 2 }}
// //           />

// //           {/* Prescription */}
// //           <TextField
// //             fullWidth
// //             label="Prescription"
// //             value={prescription}
// //             onChange={(e) => setPrescription(e.target.value)}
// //             error={!!errors.prescription}
// //             helperText={errors.prescription}
// //             sx={{ mb: 2 }}
// //           />

// //           {/* Dues */}
// //           <TextField
// //             fullWidth
// //             type="number"
// //             label="Dues"
// //             value={dues}
// //             onChange={(e) => setDues(e.target.value)}
// //             error={!!errors.dues}
// //             helperText={errors.dues}
// //             sx={{ mb: 2 }}
// //           />

// //           {/* Buttons */}
// //           <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
// //             <Button variant="outlined" onClick={handleClose}>
// //               Cancel
// //             </Button>
// //             <Button
// //               type="submit"
// //               variant="contained"
// //               sx={{ background: "#B22222", color: "white" }}
// //             >
// //               Submit
// //             </Button>
// //           </Box>
// //         </form>
// //       </Box>
// //     </Modal>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import {
//   Modal,
//   Box,
//   Typography,
//   TextField,
//   Button,
// } from "@mui/material";
// import { createRecord } from "../../DAL/create";
// import { updateRecord } from "../../DAL/edit";
// import { formatDate } from "../../Utils/Formatedate";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "60%",
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: "12px",
// };

// export default function AddRecord({
//   open,
//   setOpen,
//   Modeltype,
//   Modeldata,
//   onResponse,
// }) {
//   const [patientName, setPatientName] = useState("");
//   const [appointmentDate, setAppointmentDate] = useState("");
//   const [appointmentTime, setAppointmentTime] = useState("");
//   const [reason, setReason] = useState("");
//   const [prescription, setPrescription] = useState("");
//   const [dues, setDues] = useState("");
//   const [errors, setErrors] = useState({});

//   // 🧩 Prefill fields on Edit
//   useEffect(() => {
//     if (Modeldata) {
//       setPatientName(Modeldata.patientName || "");
//       setAppointmentDate(formatDate(Modeldata.appointmentDate, "form"));
//       setAppointmentTime(Modeldata.appointmentTime || "");
//       setReason(Modeldata.reason || "");
//       setPrescription(Modeldata.prescription || "");
//       setDues(Modeldata.dues || "");
//     } else {
//       setPatientName("");
//       setAppointmentDate("");
//       setAppointmentTime("");
//       setReason("");
//       setPrescription("");
//       setDues("");
//     }
//     setErrors({});
//   }, [Modeldata]);

//   const handleClose = () => setOpen(false);

//   // ✅ Validation (same logic style as ReportPage)
//   const validateFields = () => {
//     const newErrors = {};

//     // Name validation — only alphabets and spaces
//     if (!patientName.trim()) {
//       newErrors.patientName = "Patient name is required.";
//     } else if (!/^[A-Za-z\s]+$/.test(patientName)) {
//       newErrors.patientName = "Name can only contain alphabets.";
//     }

//     // Date validation
//     if (!appointmentDate)
//       newErrors.appointmentDate = "Appointment date is required.";

//     // Time validation
//     if (!appointmentTime)
//       newErrors.appointmentTime = "Appointment time is required.";

//     // Reason validation — text only
//     if (!reason.trim()) {
//       newErrors.reason = "Reason is required.";
//     } else if (!/^[A-Za-z\s]+$/.test(reason)) {
//       newErrors.reason = "Reason can only contain alphabets.";
//     }

//     // Prescription validation — text only
//     if (!prescription.trim()) {
//       newErrors.prescription = "Prescription is required.";
//     } else if (!/^[A-Za-z\s]+$/.test(prescription)) {
//       newErrors.prescription = "Prescription can only contain alphabets.";
//     }

//     // Dues validation — numeric, no negative numbers
//     if (dues === "") {
//       newErrors.dues = "Dues are required.";
//     } else if (isNaN(dues) || Number(dues) < 0) {
//       newErrors.dues = "Dues must be a positive number.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // ✅ Handle submit (Add / Update)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateFields()) return;

//     const payload = {
//       patientName,
//       appointmentDate: appointmentDate ? new Date(appointmentDate) : null,
//       appointmentTime,
//       reason,
//       prescription,
//       dues,
//     };

//     try {
//       let response;
//       if (Modeltype === "Add") {
//         response = await createRecord(payload);
//       } else {
//         response = await updateRecord(Modeldata._id, payload);
//       }

//       if (response?.status === 200 || response?.status === 201) {
//         onResponse({
//           messageType: "success",
//           message:
//             response.message ||
//             `Record ${Modeltype === "Add" ? "added" : "updated"} successfully.`,
//           data: response.data || payload,
//         });
//         setErrors({});
//         setOpen(false); // ✅ Close popup on success
//       } else if (response?.status === 400 && response?.missingFields) {
//         const fieldErrors = {};
//         response.missingFields.forEach((f) => {
//           fieldErrors[f.field] = f.message;
//         });
//         setErrors(fieldErrors);
//       } else {
//         onResponse({
//           messageType: "error",
//           message: response?.message || "Failed to save record",
//         });
//       }
//     } catch (err) {
//       console.error("❌ Error saving record:", err);
//       onResponse({
//         messageType: "error",
//         message: err.response?.data?.message || "Server error",
//       });
//     }
//   };

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box sx={style}>
//         <Typography variant="h6" gutterBottom>
//           {Modeltype} Record
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           {/* Left + Right Columns */}
//           <Box
//             sx={{
//               display: "grid",
//               gridTemplateColumns: "1fr 1fr",
//               gap: 2,
//               mb: 2,
//             }}
//           >
//             <TextField
//               label="Patient Name"
//               value={patientName}
//               onChange={(e) => setPatientName(e.target.value)}
//               error={!!errors.patientName}
//               helperText={errors.patientName}
//             />

//             <TextField
//               type="number"
//               label="Dues"
//               value={dues}
//               onChange={(e) => setDues(e.target.value)}
//               error={!!errors.dues}
//               helperText={errors.dues}
//             />

//             <TextField
//               type="date"
//               label="Appointment Date"
//               InputLabelProps={{ shrink: true }}
//               value={appointmentDate}
//               onChange={(e) => setAppointmentDate(e.target.value)}
//               error={!!errors.appointmentDate}
//               helperText={errors.appointmentDate}
//             />

//             <TextField
//               type="time"
//               label="Appointment Time"
//               InputLabelProps={{ shrink: true }}
//               value={appointmentTime}
//               onChange={(e) => setAppointmentTime(e.target.value)}
//               error={!!errors.appointmentTime}
//               helperText={errors.appointmentTime}
//             />

//             <TextField
//               label="Reason"
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//               error={!!errors.reason}
//               helperText={errors.reason}
//             />

//             <TextField
//               label="Prescription"
//               value={prescription}
//               onChange={(e) => setPrescription(e.target.value)}
//               error={!!errors.prescription}
//               helperText={errors.prescription}
//             />
//           </Box>

//           {/* Buttons */}
//           <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
//             <Button variant="outlined" onClick={handleClose}>
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               variant="contained"
//               sx={{ background: "#B22222", color: "white" }}
//             >
//               Submit
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </Modal>
//   );
// // }
import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { createRecord } from "../../DAL/create";
import { updateRecord } from "../../DAL/edit";
import { formatDate } from "../../Utils/Formatedate";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};

export default function AddRecord({
  open,
  setOpen,
  Modeltype,
  Modeldata,
  onResponse,
}) {
  const [patientName, setPatientName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [reason, setReason] = useState("");
  const [prescription, setPrescription] = useState("");
  const [dues, setDues] = useState("");
  const [errors, setErrors] = useState({});

  // 🧩 Prefill fields or reset them
  useEffect(() => {
    if (Modeldata) {
      setPatientName(Modeldata.patientName || "");
      setAppointmentDate(formatDate(Modeldata.appointmentDate, "form"));
      setAppointmentTime(Modeldata.appointmentTime || "");
      setReason(Modeldata.reason || "");
      setPrescription(Modeldata.prescription || "");
      setDues(Modeldata.dues || "");
    } else {
      resetForm();
    }
    setErrors({});
  }, [Modeldata]);

  // ✅ Function to reset all form fields
  const resetForm = () => {
    setPatientName("");
    setAppointmentDate("");
    setAppointmentTime("");
    setReason("");
    setPrescription("");
    setDues("");
  };

  // ✅ Close modal & reset fields (like Report)
  const handleClose = () => {
    resetForm();
    setErrors({});
    setOpen(false);
  };

  // ✅ Validate input fields
  const validateFields = () => {
    const newErrors = {};

    if (!patientName.trim()) newErrors.patientName = "Patient name is required.";
    else if (!/^[A-Za-z\s]+$/.test(patientName))
      newErrors.patientName = "Name can only contain alphabets.";

    if (!appointmentDate)
      newErrors.appointmentDate = "Appointment date is required.";

    if (!appointmentTime)
      newErrors.appointmentTime = "Appointment time is required.";

    if (!reason.trim()) newErrors.reason = "Reason is required.";
    else if (!/^[A-Za-z\s]+$/.test(reason))
      newErrors.reason = "Reason can only contain alphabets.";

    if (!prescription.trim()) newErrors.prescription = "Prescription is required.";
    else if (!/^[A-Za-z\s]+$/.test(prescription))
      newErrors.prescription = "Prescription can only contain alphabets.";

    if (dues === "") newErrors.dues = "Dues are required.";
    else if (isNaN(dues) || Number(dues) < 0)
      newErrors.dues = "Dues must be a positive number.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit handler
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validateFields()) return;

  //   const payload = {
  //     patientName,
  //     appointmentDate: appointmentDate ? new Date(appointmentDate) : null,
  //     appointmentTime,
  //     reason,
  //     prescription,
  //     dues,
  //   };

  //   try {
  //     let response;
  //     if (Modeltype === "Add") {
  //       response = await createRecord(payload);
  //     } else {
  //       response = await updateRecord(Modeldata._id, payload);
  //     }

  //     if (response?.status === 200 || response?.status === 201) {
  //       onResponse({
  //         messageType: "success",
  //         message:
  //           response.message ||
  //           `Record ${Modeltype === "Add" ? "added" : "updated"} successfully.`,
  //         data: response.data || payload,
  //       });

  //       // ✅ Close modal & reset fields after success
  //       resetForm();
  //       setErrors({});
  //       setOpen(false);
  //     } else if (response?.status === 400 && response?.missingFields) {
  //       const fieldErrors = {};
  //       response.missingFields.forEach((f) => {
  //         fieldErrors[f.field] = f.message;
  //       });
  //       setErrors(fieldErrors);
  //     } else {
  //       onResponse({
  //         messageType: "error",
  //         message: response?.message || "Failed to save record",
  //       });
  //     }
  //   } catch (err) {
  //     console.error("❌ Error saving record:", err);
  //     onResponse({
  //       messageType: "error",
  //       message: err.response?.data?.message || "Server error",
  //     });
  //   }
  // };


  // ✅ Handle submit (Add / Update)
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateFields()) return;

  const payload = {
    patientName,
    appointmentDate: appointmentDate ? new Date(appointmentDate) : null,
    appointmentTime,
    reason,
    prescription,
    dues,
  };

  try {
    let response;
    if (Modeltype === "Add") {
      response = await createRecord(payload);
    } else {
      response = await updateRecord(Modeldata._id, payload);
    }

    // ✅ Treat any truthy successful response as success
    if (
      response?.status === 200 ||
      response?.status === 201 ||
      response?.message?.toLowerCase().includes("success")
    ) {
      onResponse({
        messageType: "success",
        message:
          response.message ||
          `Record ${Modeltype === "Add" ? "added" : "updated"} successfully.`,
        data: response.data || payload,
      });

      setErrors({});
      setOpen(false); // ✅ Close popup even if backend status varies
      return;
    }

    // ⚠️ Handle backend validation errors
    if (response?.status === 400 && response?.missingFields) {
      const fieldErrors = {};
      response.missingFields.forEach((f) => {
        fieldErrors[f.field] = f.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // ❌ Fallback for unexpected response
    onResponse({
      messageType: "error",
      message: response?.message || "Failed to save record",
    });
  } catch (err) {
    console.error("❌ Error saving record:", err);
    onResponse({
      messageType: "error",
      message: err.response?.data?.message || "Server error",
    });
  } finally {
    // ✅ Ensure popup always closes after attempt (even if slight error)
    setOpen(false);
  }
};

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          {Modeltype} Record
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
              mb: 2,
            }}
          >
            <TextField
              label="Patient Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              error={!!errors.patientName}
              helperText={errors.patientName}
            />

            <TextField
              type="number"
              label="Dues"
              value={dues}
              onChange={(e) => setDues(e.target.value)}
              error={!!errors.dues}
              helperText={errors.dues}
            />

            <TextField
              type="date"
              label="Appointment Date"
              InputLabelProps={{ shrink: true }}
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              error={!!errors.appointmentDate}
              helperText={errors.appointmentDate}
            />

            <TextField
              type="time"
              label="Appointment Time"
              InputLabelProps={{ shrink: true }}
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              error={!!errors.appointmentTime}
              helperText={errors.appointmentTime}
            />

            <TextField
              label="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              error={!!errors.reason}
              helperText={errors.reason}
            />

            <TextField
              label="Prescription"
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              error={!!errors.prescription}
              helperText={errors.prescription}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
             
              variant="contained"
              sx={{ background: "#B22222", color: "white" }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
// import React, { useEffect, useState } from "react";
// import {
//   Modal,
//   Box,
//   Typography,
//   TextField,
//   Button,
// } from "@mui/material";
// import { createReport } from "../../DAL/create";
// import { updateReport } from "../../DAL/edit";
// import { formatDate } from "../../Utils/Formatedate";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "60%",
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: "12px",
//   maxHeight: "90vh",
//   overflowY: "auto",
// };

// export default function AddReport({
//   open,
//   setOpen,
//   Modeltype,
//   Modeldata,
//   onResponse,
// }) {
//   const [reportDate, setReportDate] = useState("");
//   const [totalAppointments, setTotalAppointments] = useState("");
//   const [patientsSeen, setPatientsSeen] = useState("");
//   const [cancelled, setCancelled] = useState("");
//   const [noShow, setNoShow] = useState("");
//   const [totalRevenue, setTotalRevenue] = useState("");
//   const [prescriptionsGiven, setPrescriptionsGiven] = useState("");
//   const [commonDiseases, setCommonDiseases] = useState("");
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (Modeldata) {
//       setReportDate(formatDate(Modeldata.reportDate, "form"));
//       setTotalAppointments(Modeldata.totalAppointments || "");
//       setPatientsSeen(Modeldata.patientsSeen || "");
//       setCancelled(Modeldata.cancelled || "");
//       setNoShow(Modeldata.noShow || "");
//       setTotalRevenue(Modeldata.totalRevenue || "");
//       setPrescriptionsGiven(Modeldata.prescriptionsGiven || "");
//       setCommonDiseases((Modeldata.commonDiseases || []).join(", "));
//     } else {
//       setReportDate("");
//       setTotalAppointments("");
//       setPatientsSeen("");
//       setCancelled("");
//       setNoShow("");
//       setTotalRevenue("");
//       setPrescriptionsGiven("");
//       setCommonDiseases("");
//     }
//     setErrors({});
//   }, [Modeldata]);

//   const handleClose = () => setOpen(false);

//   const validateFields = () => {
//     const newErrors = {};
//     const numberFields = [
//       { name: "totalAppointments", label: "Total Appointments", value: totalAppointments },
//       { name: "patientsSeen", label: "Patients Seen", value: patientsSeen },
//       { name: "cancelled", label: "Cancelled", value: cancelled },
//       { name: "noShow", label: "No-Show", value: noShow },
//       { name: "totalRevenue", label: "Total Revenue", value: totalRevenue },
//       { name: "prescriptionsGiven", label: "Prescriptions Given", value: prescriptionsGiven },
//     ];

//     if (!reportDate) newErrors.reportDate = "Report date is required";

//     numberFields.forEach((field) => {
//       if (field.value === "") {
//         newErrors[field.name] = `${field.label} is required`;
//       } else if (Number(field.value) < 0) {
//         newErrors[field.name] = `${field.label} cannot be negative`;
//       }
//     });

//     if (!commonDiseases.trim()) {
//       newErrors.commonDiseases = "Common diseases are required";
//     } else {
//       const diseasesArray = commonDiseases
//         .split(",")
//         .map((d) => d.trim())
//         .filter((d) => d !== "");

//       const invalid = diseasesArray.find((d) => !/^[A-Za-z\s]+$/.test(d));
//       if (invalid)
//         newErrors.commonDiseases = `Invalid entry "${invalid}". Only letters allowed.`;

//       const duplicates = diseasesArray.filter(
//         (d, i) => diseasesArray.indexOf(d.toLowerCase()) !== i
//       );
//       if (duplicates.length > 0)
//         newErrors.commonDiseases = `Duplicate entries: ${[
//           ...new Set(duplicates),
//         ].join(", ")}`;
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateFields()) return;

//     const payload = {
//       reportDate: new Date(reportDate),
//       totalAppointments: Number(totalAppointments),
//       patientsSeen: Number(patientsSeen),
//       cancelled: Number(cancelled),
//       noShow: Number(noShow),
//       totalRevenue: Number(totalRevenue),
//       prescriptionsGiven: Number(prescriptionsGiven),
//       commonDiseases: commonDiseases
//         .split(",")
//         .map((d) => d.trim())
//         .filter((d) => d),
//     };

//     try {
//       let res;
//       if (Modeltype === "Add") res = await createReport(payload);
//       else res = await updateReport(Modeldata._id, payload);

//       if (res?.status === 200 || res?.message?.includes("success")) {
//         onResponse({
//           messageType: "success",
//           message:
//             Modeltype === "Add"
//               ? "Report added successfully"
//               : "Report updated successfully",
//           data: res?.data || payload,
//         });
//         setOpen(false);
//       } else {
//         onResponse({
//           messageType: "error",
//           message: res?.message || "Operation failed",
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       onResponse({
//         messageType: "error",
//         message: "Error saving report",
//       });
//     }
//   };

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box sx={style}>
//         <Typography variant="h6" gutterBottom>
//           {Modeltype} Report
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           {/* Row 1: Report Date + Total Appointments */}
//           <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//             <TextField
//               fullWidth
//               type="date"
//               label="Report Date"
//               InputLabelProps={{ shrink: true }}
//               value={reportDate}
//               onChange={(e) => setReportDate(e.target.value)}
//               error={!!errors.reportDate}
//               helperText={errors.reportDate}
//             />
//             <TextField
//               fullWidth
//               type="number"
//               label="Total Appointments"
//               value={totalAppointments}
//               onChange={(e) => setTotalAppointments(e.target.value)}
//               error={!!errors.totalAppointments}
//               helperText={errors.totalAppointments}
//             />
//           </Box>

//           {/* Row 2: Patients Seen + Cancelled */}
//           <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//             <TextField
//               fullWidth
//               type="number"
//               label="Patients Seen"
//               value={patientsSeen}
//               onChange={(e) => setPatientsSeen(e.target.value)}
//               error={!!errors.patientsSeen}
//               helperText={errors.patientsSeen}
//             />
//             <TextField
//               fullWidth
//               type="number"
//               label="Cancelled"
//               value={cancelled}
//               onChange={(e) => setCancelled(e.target.value)}
//               error={!!errors.cancelled}
//               helperText={errors.cancelled}
//             />
//           </Box>

//           {/* Row 3: No-Show + Total Revenue */}
//           <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//             <TextField
//               fullWidth
//               type="number"
//               label="No-Show"
//               value={noShow}
//               onChange={(e) => setNoShow(e.target.value)}
//               error={!!errors.noShow}
//               helperText={errors.noShow}
//             />
//             <TextField
//               fullWidth
//               type="number"
//               label="Revenue (PKR)"
//               value={totalRevenue}
//               onChange={(e) => setTotalRevenue(e.target.value)}
//               error={!!errors.totalRevenue}
//               helperText={errors.totalRevenue}
//             />
//           </Box>

//           {/* Row 4: Prescriptions Given + Common Diseases */}
//           <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//             <TextField
//               fullWidth
//               type="number"
//               label="Prescriptions Given"
//               value={prescriptionsGiven}
//               onChange={(e) => setPrescriptionsGiven(e.target.value)}
//               error={!!errors.prescriptionsGiven}
//               helperText={errors.prescriptionsGiven}
//             />
//             <TextField
//               fullWidth
//               label="Common Diseases (comma separated)"
//               value={commonDiseases}
//               onChange={(e) => setCommonDiseases(e.target.value)}
//               error={!!errors.commonDiseases}
//               helperText={errors.commonDiseases}
//             />
//           </Box>

//           {/* Buttons */}
//           <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
//             <Button variant="outlined" onClick={handleClose}>
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               variant="contained"
//               sx={{ background: "#B22222", color: "white" }}
//             >
//               Submit
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </Modal>
//   );
// }
