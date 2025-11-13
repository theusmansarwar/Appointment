// // // // src/Components/Models/AddAppointment.js
// // // import React, { useEffect, useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import {
// // //   Modal,
// // //   Box,
// // //   Typography,
// // //   TextField,
// // //   Button,
// // //   MenuItem,
// // //   } from "@mui/material";
// // // import { updateAppointment } from "../../DAL/edit";
// // // import { createAppointment } from "../../DAL/create";
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

// // // export default function AddAppointment({ open, setOpen, Modeltype, Modeldata, onResponse }) {
// // //   const [patientName, setPatientName] = useState("");
// // //   const [appointmentDate, setAppointmentDate] = useState("");
// // //   const [appointmentTime, setAppointmentTime] = useState("");
// // //   const [status, setStatus] = useState("Pending");
// // //   const [reason, setReason] = useState("");
  
  

// // //   useEffect(() => {
// // //     if (Modeldata) {
// // //       setPatientName(Modeldata.patientName || "");
// // //        setAppointmentDate(formatDate
// // //       (Modeldata.appointmentDate , "form"));
// // //       setAppointmentTime(Modeldata.appointmentTime || "");
// // //       setStatus(Modeldata.status || "Pending");
// // //       setReason(Modeldata.reason || "");
     
      
// // //     }
// // //   }, [Modeldata]);

// // //   const handleClose = () => setOpen(false);

// // //   const handleSubmit = async(e) => {
// // //     e.preventDefault();
// // //     const payload = {
// // //       patientName,
// // //       appointmentDate: appointmentDate ? new Date(appointmentDate) : null,
// // //       appointmentTime,
// // //       status,
// // //       reason,
     
     
// // //     };

// // //     try {
// // //           if (Modeltype === "Add") {
// // //             // Call DAL createReport
// // //             const res = await createAppointment(payload);
// // //              if(res.status==200){

// // //    }
// // //    else if(res.missingFields){
// // //         onResponse({
// // //           messageType: "success",
// // //           message: res?.message || "Appointment added",
// // //           data: res?.data || payload,
// // //         });
// // //       }
      
// // //             onResponse({
// // //               messageType: "success",
// // //               message: res?.message || "Appointment added",
// // //               data: res?.data || payload,
// // //             });
// // //           } else {
// // //             // Call DAL updateReport
// // //             const res = await updateAppointment(Modeldata._id, payload);
// // //             onResponse({
// // //               messageType: "success",
// // //               message: res?.message || "Appointment updated",
// // //               data: res?.data || payload,
// // //             });
// // //           }
// // //           setOpen(false);
// // //         } catch (err) {
// // //           console.error(err);
// // //           onResponse({
// // //             messageType: "error",
// // //             message: "Error saving report",
// // //           });
// // //         }
// // //   };

// // //   return (
// // //     <Modal open={open} onClose={handleClose}>
// // //       <Box sx={style}>
// // //         <Typography variant="h6" gutterBottom>
// // //           {Modeltype} Appointment
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
// // //           label="Date"
// // //           InputLabelProps={{ shrink: true }}
// // //           value={appointmentDate}
// // //           onChange={(e) => setAppointmentDate(e.target.value)}
// // //           sx={{ mb: 2 }}
// // //         />
// // //         <TextField
// // //           fullWidth
// // //           type="time"
// // //           label="Time"
// // //           InputLabelProps={{ shrink: true }}
// // //           value={appointmentTime}
// // //           onChange={(e) => setAppointmentTime(e.target.value)}
// // //           sx={{ mb: 2 }}
// // //         />
// // //         <TextField
// // //           fullWidth
// // //           select
// // //           label="Status"
// // //           value={status}
// // //           onChange={(e) => setStatus(e.target.value)}
// // //           sx={{ mb: 2 }}
// // //         >
// // //           <MenuItem value="Pending">Pending</MenuItem>
// // //           <MenuItem value="Approved">Approved</MenuItem>
// // //           <MenuItem value="Completed">Completed</MenuItem>
// // //           <MenuItem value="Cancelled">Cancelled</MenuItem>
// // //         </TextField>
// // //         <TextField
// // //           fullWidth
// // //           label="Reason"
// // //           value={reason}
// // //           onChange={(e) => setReason(e.target.value)}
// // //           sx={{ mb: 2 }}
// // //         />
      

// // //         <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
// // //           <Button onClick={handleClose} sx={{ background: "#B1B1B1" }} variant="contained">
// // //             Cancel
// // //           </Button>
// // //           <Button onClick={handleSubmit} variant="contained" sx={{ background: "#B22222" }}>
// // //             Submit
// // //           </Button>
// // //         </Box>
// // //       </Box>
// // //     </Modal>
// // //   );
// // // }
// // // src/Components/Models/AddAppointment.js
// // import React, { useEffect, useState } from "react";
// // import {
// //   Modal,
// //   Box,
// //   Typography,
// //   TextField,
// //   Button,
// //   MenuItem,
// // } from "@mui/material";
// // import { updateAppointment } from "../../DAL/edit";
// // import { createAppointment } from "../../DAL/create";
// // import { formatDate } from "../../Utils/Formatedate";

// // const style = {
// //   position: "absolute",
// //   top: "50%",
// //   left: "50%",
// //   transform: "translate(-50%, -50%)",
// //   width: "50%",
// //   bgcolor: "background.paper",
// //   boxShadow: 24,
// //   p: 4,
// //   borderRadius: "12px",
// // };

// // export default function AddAppointment({
// //   open,
// //   setOpen,
// //   Modeltype,
// //   Modeldata,
// //   onResponse,
// // }) {
// //   const [formData, setFormData] = useState({
// //     patientName: "",
// //     appointmentDate: "",
// //     appointmentTime: "",
// //     status: "Pending",
// //     reason: "",
// //   });

// //   const [errors, setErrors] = useState({});

// //   // Populate data for edit mode
// //   useEffect(() => {
// //     if (Modeldata) {
// //       setFormData({
// //         patientName: Modeldata.patientName || "",
// //         appointmentDate: formatDate(Modeldata.appointmentDate, "form") || "",
// //         appointmentTime: Modeldata.appointmentTime || "",
// //         status: Modeldata.status || "Pending",
// //         reason: Modeldata.reason || "",
// //       });
// //       setErrors({});
// //     }
// //   }, [Modeldata]);

// //   const handleClose = () => {
// //     setErrors({});
// //     setOpen(false);
// //   };

// //   // Validate fields
// //   const validateForm = () => {
// //     const newErrors = {};

// //     if (!formData.patientName.trim())
// //       newErrors.patientName = "Patient name is required.";
// //     if (!formData.appointmentDate)
// //       newErrors.appointmentDate = "Appointment date is required.";
// //     if (!formData.appointmentTime)
// //       newErrors.appointmentTime = "Appointment time is required.";
// //     if (!formData.reason.trim())
// //       newErrors.reason = "Reason for appointment is required.";

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   // Handle field changes
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   // Submit (Add / Update)
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!validateForm()) return;

// //     const payload = {
// //       ...formData,
// //       appointmentDate: formData.appointmentDate
// //         ? new Date(formData.appointmentDate)
// //         : null,
// //     };

// //     try {
// //       let res;
// //       if (Modeltype === "Add") {
// //         res = await createAppointment(payload);
// //       } else {
// //         res = await updateAppointment(Modeldata._id, payload);
// //       }

// //       if (res?.status === 200 || res?.status === 201 || res?.success) {
// //         onResponse({
// //           messageType: "success",
// //           message:
// //             res?.message ||
// //             `Appointment ${Modeltype === "Add" ? "added" : "updated"} successfully.`,
// //           data: res?.data || payload,
// //         });
// //         setOpen(false); // ✅ close modal on success
// //         setErrors({});
// //       } else if (res?.missingFields) {
// //         const fieldErrors = {};
// //         res.missingFields.forEach((f) => {
// //           fieldErrors[f.field] = f.message;
// //         });
// //         setErrors(fieldErrors);
// //       } else {
// //         onResponse({
// //           messageType: "error",
// //           message: res?.message || "Something went wrong.",
// //         });
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       onResponse({
// //         messageType: "error",
// //         message: "Error saving appointment",
// //       });
// //     }
// //   };

// //   return (
// //     <Modal open={open} onClose={handleClose}>
// //       <Box sx={style} component="form" onSubmit={handleSubmit}>
// //         <Typography variant="h6" gutterBottom>
// //           {Modeltype} Appointment
// //         </Typography>

// //         {/* Patient Name */}
// //         <TextField
// //           fullWidth
// //           label="Patient Name"
// //           name="patientName"
// //           value={formData.patientName}
// //           onChange={handleChange}
// //           sx={{ mb: 2 }}
// //           error={!!errors.patientName}
// //           helperText={errors.patientName}
// //         />

// //         {/* Appointment Date */}
// //         <TextField
// //           fullWidth
// //           type="date"
// //           label="Date"
// //           name="appointmentDate"
// //           InputLabelProps={{ shrink: true }}
// //           value={formData.appointmentDate}
// //           onChange={handleChange}
// //           sx={{ mb: 2 }}
// //           error={!!errors.appointmentDate}
// //           helperText={errors.appointmentDate}
// //         />

// //         {/* Appointment Time */}
// //         <TextField
// //           fullWidth
// //           type="time"
// //           label="Time"
// //           name="appointmentTime"
// //           InputLabelProps={{ shrink: true }}
// //           value={formData.appointmentTime}
// //           onChange={handleChange}
// //           sx={{ mb: 2 }}
// //           error={!!errors.appointmentTime}
// //           helperText={errors.appointmentTime}
// //         />

// //         {/* Status */}
// //         <TextField
// //           fullWidth
// //           select
// //           label="Status"
// //           name="status"
// //           value={formData.status}
// //           onChange={handleChange}
// //           sx={{ mb: 2 }}
// //         >
// //           <MenuItem value="Pending">Pending</MenuItem>
// //           <MenuItem value="Approved">Approved</MenuItem>
// //           <MenuItem value="Completed">Completed</MenuItem>
// //           <MenuItem value="Cancelled">Cancelled</MenuItem>
// //         </TextField>

// //         {/* Reason */}
// //         <TextField
// //           fullWidth
// //           label="Reason"
// //           name="reason"
// //           value={formData.reason}
// //           onChange={handleChange}
// //           sx={{ mb: 2 }}
// //           error={!!errors.reason}
// //           helperText={errors.reason}
// //         />

// //         {/* Buttons */}
// //         <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
// //           <Button onClick={handleClose} variant="outlined" color="secondary">
// //             Cancel
// //           </Button>
// //           <Button type="submit" variant="contained" sx={{ background: "#B22222" }}>
// //             {Modeltype === "Add" ? "Submit" : "Update"}
// //           </Button>
// //         </Box>
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
//   MenuItem,
// } from "@mui/material";
// import { updateAppointment } from "../../DAL/edit";
// import { createAppointment } from "../../DAL/create";
// import { formatDate } from "../../Utils/Formatedate";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "50%",
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: "12px",
// };

// export default function AddAppointment({
//   open,
//   setOpen,
//   Modeltype,
//   Modeldata,
//   onResponse,
// }) {
//   const [formData, setFormData] = useState({
//     patientName: "",
//     appointmentDate: "",
//     appointmentTime: "",
//     status: "Pending",
//     reason: "",
//   });

//   const [errors, setErrors] = useState({});

//   // Populate data for edit mode
//   useEffect(() => {
//     if (Modeldata) {
//       setFormData({
//         patientName: Modeldata.patientName || "",
//         appointmentDate: formatDate(Modeldata.appointmentDate, "form") || "",
//         appointmentTime: Modeldata.appointmentTime || "",
//         status: Modeldata.status || "Pending",
//         reason: Modeldata.reason || "",
//       });
//       setErrors({});
//     } else {
//       setFormData({
//         patientName: "",
//         appointmentDate: "",
//         appointmentTime: "",
//         status: "Pending",
//         reason: "",
//       });
//       setErrors({});
//     }
//   }, [Modeldata]);

//   const handleClose = () => {
//     setErrors({});
//     setOpen(false);
//   };

//   // ✅ Validation function (same logic style as reports)
//   const validateForm = () => {
//     const newErrors = {};
//     const nameRegex = /^[A-Za-z\s]+$/; // alphabets & spaces only

//     if (!formData.patientName.trim())
//       newErrors.patientName = "Patient name is required.";
//     else if (!nameRegex.test(formData.patientName.trim()))
//       newErrors.patientName = "Name can only contain alphabets and spaces.";

//     if (!formData.appointmentDate)
//       newErrors.appointmentDate = "Appointment date is required.";

//     if (!formData.appointmentTime)
//       newErrors.appointmentTime = "Appointment time is required.";

//     if (!formData.reason.trim())
//       newErrors.reason = "Reason for appointment is required.";
//     else if (formData.reason.trim().length < 3)
//       newErrors.reason = "Reason must be at least 3 characters.";

//     // ✅ Check for negative or invalid values (e.g., manually typed time)
//     if (
//       formData.appointmentTime &&
//       formData.appointmentTime.includes("-")
//     ) {
//       newErrors.appointmentTime = "Invalid time entered.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // prevent negative sign for number/time inputs
//     if (name === "appointmentTime" && value.includes("-")) return;

//     setFormData({ ...formData, [name]: value });
//   };

//   // Submit logic (Add / Update)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const payload = {
//       ...formData,
//       appointmentDate: formData.appointmentDate
//         ? new Date(formData.appointmentDate)
//         : null,
//     };

//     try {
//       let res;
//       if (Modeltype === "Add") {
//         res = await createAppointment(payload);
//       } else {
//         res = await updateAppointment(Modeldata._id, payload);
//       }

//       if (res?.status === 200 || res?.status === 201 || res?.success) {
//         onResponse({
//           messageType: "success",
//           message:
//             res?.message ||
//             `Appointment ${Modeltype === "Add" ? "added" : "updated"} successfully.`,
//           data: res?.data || payload,
//         });
//         setErrors({});
//         setOpen(false); // ✅ close modal on success
//       } else if (res?.missingFields) {
//         const fieldErrors = {};
//         res.missingFields.forEach((f) => {
//           fieldErrors[f.field] = f.message;
//         });
//         setErrors(fieldErrors);
//       } else {
//         onResponse({
//           messageType: "error",
//           message: res?.message || "Something went wrong.",
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       onResponse({
//         messageType: "error",
//         message: "Error saving appointment",
//       });
//     }
//   };

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box sx={style} component="form" onSubmit={handleSubmit}>
//         <Typography variant="h6" gutterBottom>
//           {Modeltype} Appointment
//         </Typography>

//         {/* Patient Name */}
//         <TextField
//           fullWidth
//           label="Patient Name"
//           name="patientName"
//           value={formData.patientName}
//           onChange={handleChange}
//           sx={{ mb: 2 }}
//           error={!!errors.patientName}
//           helperText={errors.patientName}
//         />

//         {/* Appointment Date */}
//         <TextField
//           fullWidth
//           type="date"
//           label="Date"
//           name="appointmentDate"
//           InputLabelProps={{ shrink: true }}
//           value={formData.appointmentDate}
//           onChange={handleChange}
//           sx={{ mb: 2 }}
//           error={!!errors.appointmentDate}
//           helperText={errors.appointmentDate}
//         />

//         {/* Appointment Time */}
//         <TextField
//           fullWidth
//           type="time"
//           label="Time"
//           name="appointmentTime"
//           InputLabelProps={{ shrink: true }}
//           value={formData.appointmentTime}
//           onChange={handleChange}
//           sx={{ mb: 2 }}
//           error={!!errors.appointmentTime}
//           helperText={errors.appointmentTime}
//         />

//         {/* Status */}
//         <TextField
//           fullWidth
//           select
//           label="Status"
//           name="status"
//           value={formData.status}
//           onChange={handleChange}
//           sx={{ mb: 2 }}
//         >
//           <MenuItem value="Pending">Pending</MenuItem>
//           <MenuItem value="Approved">Approved</MenuItem>
//           <MenuItem value="Completed">Completed</MenuItem>
//           <MenuItem value="Cancelled">Cancelled</MenuItem>
//         </TextField>

//         {/* Reason */}
//         <TextField
//           fullWidth
//           label="Reason"
//           name="reason"
//           value={formData.reason}
//           onChange={handleChange}
//           sx={{ mb: 2 }}
//           error={!!errors.reason}
//           helperText={errors.reason}
//         />

//         {/* Buttons */}
//         <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
//           <Button onClick={handleClose} variant="outlined" color="secondary">
//             Cancel
//           </Button>
//           <Button type="submit" variant="contained" sx={{ background: "#B22222" }}>
//             {Modeltype === "Add" ? "Submit" : "Update"}
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// }
// import React, { useEffect, useState } from "react";
// import {
//   Modal,
//   Box,
//   Typography,
//   TextField,
//   Button,
//   MenuItem,
// } from "@mui/material";
// import { updateAppointment } from "../../DAL/edit";
// import { createAppointment } from "../../DAL/create";
// import { formatDate } from "../../Utils/Formatedate";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "50%",
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: "12px",
// };

// export default function AddAppointment({
//   open,
//   setOpen,
//   Modeltype,
//   Modeldata,
//   onResponse,
// }) {
//   const [formData, setFormData] = useState({
//     patientName: "",
//     appointmentDate: "",
//     appointmentTime: "",
//     status: "Pending",
//     reason: "",
//   });

//   const [errors, setErrors] = useState({});

//   // ✅ Load existing data if editing
//   useEffect(() => {
//     if (Modeldata) {
//       setFormData({
//         patientName: Modeldata.patientName || "",
//         appointmentDate: formatDate(Modeldata.appointmentDate, "form") || "",
//         appointmentTime: Modeldata.appointmentTime || "",
//         status: Modeldata.status || "Pending",
//         reason: Modeldata.reason || "",
//       });
//     } else {
//       setFormData({
//         patientName: "",
//         appointmentDate: "",
//         appointmentTime: "",
//         status: "Pending",
//         reason: "",
//       });
//     }
//     setErrors({});
//   }, [Modeldata]);

//   const handleClose = () => {
//     setErrors({});
//     setOpen(false);
//   };

//   // ✅ Validation function
//   const validateForm = () => {
//     const newErrors = {};
//     const nameRegex = /^[A-Za-z\s]+$/;

//     if (!formData.patientName.trim())
//       newErrors.patientName = "Patient name is required.";
//     else if (!nameRegex.test(formData.patientName.trim()))
//       newErrors.patientName = "Name can only contain alphabets and spaces.";

//     if (!formData.appointmentDate)
//       newErrors.appointmentDate = "Appointment date is required.";

//     if (!formData.appointmentTime)
//       newErrors.appointmentTime = "Appointment time is required.";

//     if (!formData.reason.trim())
//       newErrors.reason = "Reason for appointment is required.";
//     else if (formData.reason.trim().length < 3)
//       newErrors.reason = "Reason must be at least 3 characters.";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "appointmentTime" && value.includes("-")) return; // prevent invalid time
//     setFormData({ ...formData, [name]: value });
//   };

//   // ✅ Submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const payload = {
//       ...formData,
//       appointmentDate: formData.appointmentDate
//         ? new Date(formData.appointmentDate)
//         : null,
//     };

//     try {
//       let res;
//       if (Modeltype === "Add") {
//         res = await createAppointment(payload);
//       } else {
//         res = await updateAppointment(Modeldata._id, payload);
//       }

//       // ✅ Treat as success if any positive condition is met
//       const success =
//         res?.status === 200 ||
//         res?.status === 201 ||
//         res?.success ||
//         res?.message?.toLowerCase()?.includes("success");

//       if (success) {
//         onResponse({
//           messageType: "success",
//           message:
//             res?.message ||
//             `Appointment ${
//               Modeltype === "Add" ? "added" : "updated"
//             } successfully.`,
//           data: res?.data || payload,
//         });
//         setErrors({});
//         setOpen(false); // ✅ Close modal after success (like report form)
//       } else if (res?.missingFields) {
//         const fieldErrors = {};
//         res.missingFields.forEach((f) => {
//           fieldErrors[f.field] = f.message;
//         });
//         setErrors(fieldErrors);
//       } else {
//         onResponse({
//           messageType: "error",
//           message: res?.message || "Something went wrong.",
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       onResponse({
//         messageType: "error",
//         message: "Error saving appointment.",
//       });
//     }
//   };

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box sx={style} component="form" onSubmit={handleSubmit}>
//         <Typography variant="h6" gutterBottom>
//           {Modeltype} Appointment
//         </Typography>

//         <TextField
//           fullWidth
//           label="Patient Name"
//           name="patientName"
//           value={formData.patientName}
//           onChange={handleChange}
//           sx={{ mb: 2 }}
//           error={!!errors.patientName}
//           helperText={errors.patientName}
//         />

//         <TextField
//           fullWidth
//           type="date"
//           label="Date"
//           name="appointmentDate"
//           InputLabelProps={{ shrink: true }}
//           value={formData.appointmentDate}
//           onChange={handleChange}
//           sx={{ mb: 2 }}
//           error={!!errors.appointmentDate}
//           helperText={errors.appointmentDate}
//         />

//         <TextField
//           fullWidth
//           type="time"
//           label="Time"
//           name="appointmentTime"
//           InputLabelProps={{ shrink: true }}
//           value={formData.appointmentTime}
//           onChange={handleChange}
//           sx={{ mb: 2 }}
//           error={!!errors.appointmentTime}
//           helperText={errors.appointmentTime}
//         />

//         <TextField
//           fullWidth
//           select
//           label="Status"
//           name="status"
//           value={formData.status}
//           onChange={handleChange}
//           sx={{ mb: 2 }}
//         >
//           <MenuItem value="Pending">Pending</MenuItem>
//           <MenuItem value="Approved">Approved</MenuItem>
//           <MenuItem value="Completed">Completed</MenuItem>
//           <MenuItem value="Cancelled">Cancelled</MenuItem>
//         </TextField>

//         <TextField
//           fullWidth
//           label="Reason"
//           name="reason"
//           value={formData.reason}
//           onChange={handleChange}
//           sx={{ mb: 2 }}
//           error={!!errors.reason}
//           helperText={errors.reason}
//         />

//         <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
//           <Button onClick={handleClose} variant="outlined" color="secondary">
//             Cancel
//           </Button>
//           <Button
//             type="submit"
//             variant="contained"
//             sx={{ background: "#B22222", color: "white" }}
//           >
//             {Modeltype === "Add" ? "Submit" : "Update"}
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// }
import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { updateAppointment } from "../../DAL/edit";
import { createAppointment } from "../../DAL/create";
import { formatDate } from "../../Utils/Formatedate";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};

export default function AddAppointment({
  open,
  setOpen,
  Modeltype,
  Modeldata,
  onResponse,
}) {
  const [formData, setFormData] = useState({
    patientName: "",
    appointmentDate: "",
    appointmentTime: "",
    status: "Pending",
    reason: "",
  });

  const [errors, setErrors] = useState({});

  // ✅ Load existing data if editing
  useEffect(() => {
    if (Modeldata) {
      setFormData({
        patientName: Modeldata.patientName || "",
        appointmentDate: formatDate(Modeldata.appointmentDate, "form") || "",
        appointmentTime: Modeldata.appointmentTime || "",
        status: Modeldata.status || "Pending",
        reason: Modeldata.reason || "",
      });
    } else {
      setFormData({
        patientName: "",
        appointmentDate: "",
        appointmentTime: "",
        status: "Pending",
        reason: "",
      });
    }
    setErrors({});
  }, [Modeldata]);

  const handleClose = () => {
    setErrors({});
    setOpen(false);
  };

  // ✅ Validation function
  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const today = new Date();
    const selectedDate = new Date(formData.appointmentDate);

    if (!formData.patientName.trim())
      newErrors.patientName = "Patient name is required.";
    else if (!nameRegex.test(formData.patientName.trim()))
      newErrors.patientName = "Name can only contain alphabets and spaces.";

    if (!formData.appointmentDate)
      newErrors.appointmentDate = "Appointment date is required.";
    else if (selectedDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0))
      newErrors.appointmentDate = "Past dates cannot be selected.";

    if (!formData.appointmentTime)
      newErrors.appointmentTime = "Appointment time is required.";

    if (!formData.reason.trim())
      newErrors.reason = "Reason for appointment is required.";
    else if (formData.reason.trim().length < 3)
      newErrors.reason = "Reason must be at least 3 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "appointmentTime" && value.includes("-")) return; // prevent invalid time
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      ...formData,
      appointmentDate: formData.appointmentDate
        ? new Date(formData.appointmentDate)
        : null,
    };

    try {
      let res;
      if (Modeltype === "Add") {
        res = await createAppointment(payload);
      } else {
        res = await updateAppointment(Modeldata._id, payload);
      }

      // ✅ Treat as success if any positive condition is met
      const success =
        res?.status === 200 ||
        res?.status === 201 ||
        res?.success ||
        res?.message?.toLowerCase()?.includes("success");

      if (success) {
        onResponse({
          messageType: "success",
          message:
            res?.message ||
            `Appointment ${
              Modeltype === "Add" ? "added" : "updated"
            } successfully.`,
          data: res?.data || payload,
        });
        setErrors({});
        setOpen(false); // ✅ Close modal after success
      } else if (res?.missingFields) {
        const fieldErrors = {};
        res.missingFields.forEach((f) => {
          fieldErrors[f.field] = f.message;
        });
        setErrors(fieldErrors);
      } else {
        onResponse({
          messageType: "error",
          message: res?.message || "Something went wrong.",
        });
      }
    } catch (err) {
      console.error(err);
      onResponse({
        messageType: "error",
        message: "Error saving appointment.",
      });
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          {Modeltype} Appointment
        </Typography>

        <TextField
          fullWidth
          label="Patient Name"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          sx={{ mb: 2 }}
          error={!!errors.patientName}
          helperText={errors.patientName}
        />

        <TextField
          fullWidth
          type="date"
          label="Date"
          name="appointmentDate"
          InputLabelProps={{ shrink: true }}
          value={formData.appointmentDate}
          onChange={handleChange}
          sx={{ mb: 2 }}
          error={!!errors.appointmentDate}
          helperText={errors.appointmentDate}
        />

        <TextField
          fullWidth
          type="time"
          label="Time"
          name="appointmentTime"
          InputLabelProps={{ shrink: true }}
          value={formData.appointmentTime}
          onChange={handleChange}
          sx={{ mb: 2 }}
          error={!!errors.appointmentTime}
          helperText={errors.appointmentTime}
        />

        <TextField
          fullWidth
          select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Approved">Approved</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
        </TextField>

        <TextField
          fullWidth
          label="Reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          sx={{ mb: 2 }}
          error={!!errors.reason}
          helperText={errors.reason}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ background: "#B22222", color: "white" }}
          >
            {Modeltype === "Add" ? "Submit" : "Update"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
