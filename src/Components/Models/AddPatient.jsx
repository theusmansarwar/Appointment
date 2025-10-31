// // import React, { useEffect, useState } from "react";
// // import {
// //   Modal,
// //   Box,
// //   Typography,
// //   TextField,
// //   Button,
// //   MenuItem,
// // } from "@mui/material";
// // import {  updatePatient } from "../../DAL/edit"; // 🔹 Import here
// // import { createPatient } from "../../DAL/create";
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

// // export default function AddPatient({
// //   open,
// //   setOpen,
// //   Modeltype,
// //   Modeldata,
// //   onResponse,
// // }) {
// //   const [name, setName] = useState("");
// //   const [age, setAge] = useState("");
// //   const [gender, setGender] = useState("Male");
// //   const [phone, setPhone] = useState("");
// //   const [address, setAddress] = useState("");
// //   const [appointmentDate, setAppointmentDate] = useState("");
// //   const [appointmentTime, setAppointmentTime] = useState("");
// //   const [reason, setReason] = useState("");

// //   useEffect(() => {
// //     if (Modeldata) {
// //       setName(Modeldata.name || "");
// //       setAge(Modeldata.age || "");
// //       setGender(Modeldata.gender || "Male");
// //       setPhone(Modeldata.phone || "");
// //       setAddress(Modeldata.address || "");
// //        setAppointmentDate(formatDate(
// //       Modeldata.appointmentDate,  "form" ));
// //       setAppointmentTime(Modeldata.appointmentTime || "");
// //       setReason(Modeldata.reason || "");
// //     } else {
// //       // Reset if Add
// //       setName("");
// //       setAge("");
// //       setGender("Male");
// //       setPhone("");
// //       setAddress("");
// //       setAppointmentDate("");
// //       setAppointmentTime("");
// //       setReason("");
// //     }
// //   }, [Modeldata]);

// //   const handleClose = () => setOpen(false);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const payload = {
// //       name,
// //       age,
// //       gender,
// //       phone,
// //       address,
// //      appointmentDate: appointmentDate ? new Date(appointmentDate) : null,
// //       appointmentTime,
// //       reason,
// //     };

// //     try {
// //       if (Modeltype === "Add") {
// //         // 🔹 Call DAL createPatient
// //         const res = await createPatient(payload);
// //          if(res.status==200){

// //    }
// //    else if(res.missingFields){
// //         onResponse({
// //           messageType: "success",
// //           message: res?.message || "Patient added",
// //           data: res?.data || payload,
// //         });
// //       }
      
// //            onResponse({
// //              messageType: "success",
// //              message: res?.message || "Patient added",
// //              data: res?.data || payload,
// //            });
// //          }  else {
// //         // 🔹 Call DAL updatePatient (pass id from Modeldata)
// //         const res = await updatePatient(Modeldata._id, payload);
         
// //         onResponse({
// //           messageType: "success",
// //           message: res?.message || "Patient updated",
// //           data: res?.data || payload,
// //         });
// //       }
// //       setOpen(false);
// //     } catch (err) {
// //       console.error(err);
// //       onResponse({
// //         messageType: "error",
// //         message: "Error saving patient",
// //       });
// //     }
// //   };

// //   return (
// //     <Modal open={open} onClose={handleClose}>
// //       <Box sx={style} component="form" onSubmit={handleSubmit}>
// //         <Typography variant="h6" gutterBottom>
// //           {Modeltype} Patient
// //         </Typography>

// //         {/* Form Fields */}
// //         <TextField
// //           fullWidth
// //           label="Name"
// //           value={name}
// //           onChange={(e) => setName(e.target.value)}
// //           sx={{ mb: 2 }}
// //         />
// //         <TextField
// //           fullWidth
// //           type="number"
// //           label="Age"
// //           value={age}
// //           onChange={(e) => setAge(e.target.value)}
// //           sx={{ mb: 2 }}
// //         />
// //         <TextField
// //           fullWidth
// //           select
// //           label="Gender"
// //           value={gender}
// //           onChange={(e) => setGender(e.target.value)}
// //           sx={{ mb: 2 }}
// //         >
// //           <MenuItem value="Male">Male</MenuItem>
// //           <MenuItem value="Female">Female</MenuItem>
// //           <MenuItem value="Other">Other</MenuItem>
// //         </TextField>
// //         <TextField
// //           fullWidth
// //           label="Phone"
// //           value={phone}
// //           onChange={(e) => setPhone(e.target.value)}
// //           sx={{ mb: 2 }}
// //         />
// //         <TextField
// //           fullWidth
// //           label="Address"
// //           value={address}
// //           onChange={(e) => setAddress(e.target.value)}
// //           sx={{ mb: 2 }}
// //         />
// //         <TextField
// //           fullWidth
// //           type="date"
// //           label="Appointment Date"
// //           InputLabelProps={{ shrink: true }}
// //           value={appointmentDate}
// //           onChange={(e) => setAppointmentDate(e.target.value)}
// //           sx={{ mb: 2 }}
// //         />
// //         <TextField
// //           fullWidth
// //           type="time"
// //           label="Appointment Time"
// //           InputLabelProps={{ shrink: true }}
// //           value={appointmentTime}
// //           onChange={(e) => setAppointmentTime(e.target.value)}
// //           sx={{ mb: 2 }}
// //         />
// //         <TextField
// //           fullWidth
// //           label="Reason for visit"
// //           value={reason}
// //           onChange={(e) => setReason(e.target.value)}
// //           sx={{ mb: 2 }}
// //         />

// //         {/* Buttons */}
// //         <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
// //           <Button
// //             onClick={handleClose}
// //             sx={{ background: "#B1B1B1" }}
// //             variant="contained"
// //           >
// //             Cancel
// //           </Button>
// //           <Button
// //             type="submit"
// //             variant="contained"
// //             sx={{ background: "#B22222" }}
// //           >
// //             Submit
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
//   FormHelperText,
// } from "@mui/material";
// import { createPatient } from "../../DAL/create";
// import { updatePatient } from "../../DAL/edit";
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

// export default function AddPatient({
//   open,
//   setOpen,
//   Modeltype,
//   Modeldata,
//   onResponse,
// }) {
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("Male");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [appointmentDate, setAppointmentDate] = useState("");
//   const [appointmentTime, setAppointmentTime] = useState("");
//   const [reason, setReason] = useState("");
//   const [errors, setErrors] = useState({});

//   // 🧩 Prefill or reset fields when modal opens
//   useEffect(() => {
//     if (Modeldata) {
//       setName(Modeldata.name || "");
//       setAge(Modeldata.age || "");
//       setGender(Modeldata.gender || "Male");
//       setPhone(Modeldata.phone || "");
//       setAddress(Modeldata.address || "");
//       setAppointmentDate(formatDate(Modeldata.appointmentDate, "form"));
//       setAppointmentTime(Modeldata.appointmentTime || "");
//       setReason(Modeldata.reason || "");
//     } else {
//       setName("");
//       setAge("");
//       setGender("Male");
//       setPhone("");
//       setAddress("");
//       setAppointmentDate("");
//       setAppointmentTime("");
//       setReason("");
//     }
//     setErrors({});
//   }, [Modeldata]);

//   const handleClose = () => setOpen(false);

//   // 🧠 Frontend validation
//   const validateFields = () => {
//     const newErrors = {};

//     if (!name.trim()) newErrors.name = "Patient name is required.";
//     if (!age || isNaN(age) || age <= 0) newErrors.age = "Valid age is required.";
//     if (!phone.trim()) newErrors.phone = "Phone number is required.";
//     if (!address.trim()) newErrors.address = "Address is required.";
//     if (!appointmentDate) newErrors.appointmentDate = "Select an appointment date.";
//     if (!appointmentTime) newErrors.appointmentTime = "Select appointment time.";
//     if (!reason.trim()) newErrors.reason = "Please enter a reason for visit.";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // 🔹 Run validation before submitting
//     if (!validateFields()) return;

//     const patientData = {
//       name,
//       age,
//       gender,
//       phone,
//       address,
//       appointmentDate: appointmentDate ? new Date(appointmentDate) : null,
//       appointmentTime,
//       reason,
//     };

//     try {
//       let response;

//       if (Modeltype === "Add") {
//         response = await createPatient(patientData);
//       } else {
//         response = await updatePatient(Modeldata._id, patientData);
//       }

//       if (response?.status === 201 || response?.status === 200) {
//         onResponse({
//           messageType: "success",
//           message:
//             response.message ||
//             `Patient ${Modeltype === "Add" ? "added" : "updated"} successfully.`,
//           data: response.data || patientData,
//         });
//         setErrors({});
//         setOpen(false);
//       } else if (response?.status === 400 && response?.missingFields) {
//         // 🔹 Handle backend validation
//         const fieldErrors = {};
//         response.missingFields.forEach((f) => {
//           fieldErrors[f.field] = f.message;
//         });
//         setErrors(fieldErrors);
//       } else {
//         onResponse({
//           messageType: "error",
//           message: response?.message || "Failed to save patient data",
//         });
//       }
//     } catch (err) {
//       console.error("❌ Error saving patient:", err);
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
//           {Modeltype} Patient
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           {/* Name + Age */}
//           <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//             <TextField
//               fullWidth
//               label="Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               error={!!errors.name}
//               helperText={errors.name}
//             />
//             <TextField
//               fullWidth
//               type="number"
//               label="Age"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//               error={!!errors.age}
//               helperText={errors.age}
//             />
//           </Box>

//           {/* Gender + Phone */}
//           <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//             <TextField
//               fullWidth
//               select
//               label="Gender"
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//               error={!!errors.gender}
//               helperText={errors.gender}
//             >
//               <MenuItem value="Male">Male</MenuItem>
//               <MenuItem value="Female">Female</MenuItem>
//               <MenuItem value="Other">Other</MenuItem>
//             </TextField>

//             <TextField
//               fullWidth
//               label="Phone"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               error={!!errors.phone}
//               helperText={errors.phone}
//             />
//           </Box>

//           {/* Address */}
//           <Box sx={{ mt: 2 }}>
//             <TextField
//               fullWidth
//               label="Address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               error={!!errors.address}
//               helperText={errors.address}
//             />
//           </Box>

//           {/* Appointment Date + Time */}
//           <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//             <TextField
//               fullWidth
//               type="date"
//               label="Appointment Date"
//               InputLabelProps={{ shrink: true }}
//               value={appointmentDate}
//               onChange={(e) => setAppointmentDate(e.target.value)}
//               error={!!errors.appointmentDate}
//               helperText={errors.appointmentDate}
//             />
//             <TextField
//               fullWidth
//               type="time"
//               label="Appointment Time"
//               InputLabelProps={{ shrink: true }}
//               value={appointmentTime}
//               onChange={(e) => setAppointmentTime(e.target.value)}
//               error={!!errors.appointmentTime}
//               helperText={errors.appointmentTime}
//             />
//           </Box>

//           {/* Reason */}
//           <Box sx={{ mt: 2 }}>
//             <TextField
//               fullWidth
//               label="Reason for Visit"
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//               error={!!errors.reason}
//               helperText={errors.reason}
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
// import React, { useEffect, useState } from "react";
// import {
//   Modal,
//   Box,
//   Typography,
//   TextField,
//   Button,
//   MenuItem,
//   FormHelperText,
// } from "@mui/material";
// import { createPatient } from "../../DAL/create";
// import { updatePatient } from "../../DAL/edit";
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

// export default function AddPatient({
//   open,
//   setOpen,
//   Modeltype,
//   Modeldata,
//   onResponse,
// }) {
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("Male");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [appointmentDate, setAppointmentDate] = useState("");
//   const [appointmentTime, setAppointmentTime] = useState("");
//   const [reason, setReason] = useState("");
//   const [errors, setErrors] = useState({});

//   // 🧩 Prefill fields on edit
//   useEffect(() => {
//     if (Modeldata) {
//       setName(Modeldata.name || "");
//       setAge(Modeldata.age || "");
//       setGender(Modeldata.gender || "Male");
//       setPhone(Modeldata.phone || "");
//       setAddress(Modeldata.address || "");
//       setAppointmentDate(formatDate(Modeldata.appointmentDate, "form"));
//       setAppointmentTime(Modeldata.appointmentTime || "");
//       setReason(Modeldata.reason || "");
//     } else {
//       setName("");
//       setAge("");
//       setGender("Male");
//       setPhone("");
//       setAddress("");
//       setAppointmentDate("");
//       setAppointmentTime("");
//       setReason("");
//     }
//     setErrors({});
//   }, [Modeldata]);

//   const handleClose = () => setOpen(false);

//   // 🧠 Frontend validation
//   const validateFields = () => {
//     const newErrors = {};
//     if (!name.trim()) newErrors.name = "Patient name is required.";
//     if (!age || isNaN(age) || age <= 0) newErrors.age = "Valid age is required.";
//     if (!phone.trim()) newErrors.phone = "Phone number is required.";
//     if (!address.trim()) newErrors.address = "Address is required.";
//     if (!appointmentDate) newErrors.appointmentDate = "Select an appointment date.";
//     if (!appointmentTime) newErrors.appointmentTime = "Select appointment time.";
//     if (!reason.trim()) newErrors.reason = "Please enter a reason for visit.";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // 🔹 Run validation
//     if (!validateFields()) return;

//     const patientData = {
//       name,
//       age,
//       gender,
//       phone,
//       address,
//       appointmentDate: appointmentDate ? new Date(appointmentDate) : null,
//       appointmentTime,
//       reason,
//     };

//     try {
//       let response;
//       if (Modeltype === "Add") {
//         response = await createPatient(patientData);
//       } else {
//         response = await updatePatient(Modeldata._id, patientData);
//       }

//       if (response?.status === 200 || response?.status === 201) {
//         // ✅ Success → close modal and show success message
//         onResponse({
//           messageType: "success",
//           message:
//             response.message ||
//             `Patient ${Modeltype === "Add" ? "added" : "updated"} successfully.`,
//           data: response.data || patientData,
//         });
//         setErrors({});
//         setOpen(false); // 🎯 CLOSE POPUP ON SUCCESS
//       } else if (response?.status === 400 && response?.missingFields) {
//         // 🔹 Backend validation errors
//         const fieldErrors = {};
//         response.missingFields.forEach((f) => {
//           fieldErrors[f.field] = f.message;
//         });
//         setErrors(fieldErrors);
//       } else {
//         // 🔹 Any other API error
//         onResponse({
//           messageType: "error",
//           message: response?.message || "Failed to save patient data",
//         });
//       }
//     } catch (err) {
//       console.error("❌ Error saving patient:", err);
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
//           {Modeltype} Patient
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           {/* Name + Age */}
//           <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//             <TextField
//               fullWidth
//               label="Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               error={!!errors.name}
//               helperText={errors.name}
//             />
//             <TextField
//               fullWidth
//               type="number"
//               label="Age"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//               error={!!errors.age}
//               helperText={errors.age}
//             />
//           </Box>

//           {/* Gender + Phone */}
//           <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//             <TextField
//               fullWidth
//               select
//               label="Gender"
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//               error={!!errors.gender}
//               helperText={errors.gender}
//             >
//               <MenuItem value="Male">Male</MenuItem>
//               <MenuItem value="Female">Female</MenuItem>
//               <MenuItem value="Other">Other</MenuItem>
//             </TextField>

//             <TextField
//               fullWidth
//               label="Phone"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               error={!!errors.phone}
//               helperText={errors.phone}
//             />
//           </Box>

//           {/* Address */}
//           <Box sx={{ mt: 2 }}>
//             <TextField
//               fullWidth
//               label="Address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               error={!!errors.address}
//               helperText={errors.address}
//             />
//           </Box>

//           {/* Appointment Date + Time */}
//           <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//             <TextField
//               fullWidth
//               type="date"
//               label="Appointment Date"
//               InputLabelProps={{ shrink: true }}
//               value={appointmentDate}
//               onChange={(e) => setAppointmentDate(e.target.value)}
//               error={!!errors.appointmentDate}
//               helperText={errors.appointmentDate}
//             />
//             <TextField
//               fullWidth
//               type="time"
//               label="Appointment Time"
//               InputLabelProps={{ shrink: true }}
//               value={appointmentTime}
//               onChange={(e) => setAppointmentTime(e.target.value)}
//               error={!!errors.appointmentTime}
//               helperText={errors.appointmentTime}
//             />
//           </Box>

//           {/* Reason */}
//           <Box sx={{ mt: 2 }}>
//             <TextField
//               fullWidth
//               label="Reason for Visit"
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//               error={!!errors.reason}
//               helperText={errors.reason}
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
import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { createPatient } from "../../DAL/create";
import { updatePatient } from "../../DAL/edit";
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

export default function AddPatient({
  open,
  setOpen,
  Modeltype,
  Modeldata,
  onResponse,
}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState({});

  // 🧩 Prefill data on Edit
  useEffect(() => {
    if (Modeldata) {
      setName(Modeldata.name || "");
      setAge(Modeldata.age || "");
      setGender(Modeldata.gender || "Male");
      setPhone(Modeldata.phone || "");
      setAddress(Modeldata.address || "");
      setAppointmentDate(formatDate(Modeldata.appointmentDate, "form"));
      setAppointmentTime(Modeldata.appointmentTime || "");
      setReason(Modeldata.reason || "");
    } else {
      setName("");
      setAge("");
      setGender("Male");
      setPhone("");
      setAddress("");
      setAppointmentDate("");
      setAppointmentTime("");
      setReason("");
    }
    setErrors({});
  }, [Modeldata]);

  const handleClose = () => setOpen(false);

  // ✅ Enhanced Validation (like ReportPage)
  const validateFields = () => {
    const newErrors = {};

    // Name — only alphabets and spaces
    if (!name.trim()) {
      newErrors.name = "Patient name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      newErrors.name = "Name can only contain alphabets.";
    }

    // Age — positive number only
    if (!age || isNaN(age) || age <= 0) {
      newErrors.age = "Please enter a valid positive age.";
    }

    // Phone — digits only, length between 10–15
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10,15}$/.test(phone)) {
      newErrors.phone = "Phone number must be 10–15 digits.";
    }

    // Address — alphabets, numbers, spaces, commas, dots allowed
    if (!address.trim()) {
      newErrors.address = "Address is required.";
    } else if (!/^[A-Za-z0-9\s,.-]+$/.test(address)) {
      newErrors.address = "Address contains invalid characters.";
    }

    // Appointment Date
    if (!appointmentDate)
      newErrors.appointmentDate = "Appointment date is required.";

    // Appointment Time
    if (!appointmentTime)
      newErrors.appointmentTime = "Appointment time is required.";

    // Reason — alphabets only
    if (!reason.trim()) {
      newErrors.reason = "Reason for visit is required.";
    } else if (!/^[A-Za-z\s]+$/.test(reason)) {
      newErrors.reason = "Reason can only contain alphabets.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    const patientData = {
      name,
      age,
      gender,
      phone,
      address,
      appointmentDate: appointmentDate ? new Date(appointmentDate) : null,
      appointmentTime,
      reason,
    };

    try {
      let response;
      if (Modeltype === "Add") {
        response = await createPatient(patientData);
      } else {
        response = await updatePatient(Modeldata._id, patientData);
      }

      if (response?.status === 200 || response?.status === 201) {
        onResponse({
          messageType: "success",
          message:
            response.message ||
            `Patient ${Modeltype === "Add" ? "added" : "updated"} successfully.`,
          data: response.data || patientData,
        });
        setErrors({});
        setOpen(false); // ✅ Close popup on success
      } else if (response?.status === 400 && response?.missingFields) {
        const fieldErrors = {};
        response.missingFields.forEach((f) => {
          fieldErrors[f.field] = f.message;
        });
        setErrors(fieldErrors);
      } else {
        onResponse({
          messageType: "error",
          message: response?.message || "Failed to save patient data.",
        });
      }
    } catch (err) {
      console.error("❌ Error saving patient:", err);
      onResponse({
        messageType: "error",
        message: err.response?.data?.message || "Server error",
      });
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          {Modeltype} Patient
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Name + Age */}
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              fullWidth
              type="number"
              label="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              error={!!errors.age}
              helperText={errors.age}
            />
          </Box>

          {/* Gender + Phone */}
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <TextField
              fullWidth
              select
              label="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Box>

          {/* Address */}
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={!!errors.address}
              helperText={errors.address}
            />
          </Box>

          {/* Appointment Date + Time */}
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <TextField
              fullWidth
              type="date"
              label="Appointment Date"
              InputLabelProps={{ shrink: true }}
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              error={!!errors.appointmentDate}
              helperText={errors.appointmentDate}
            />
            <TextField
              fullWidth
              type="time"
              label="Appointment Time"
              InputLabelProps={{ shrink: true }}
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              error={!!errors.appointmentTime}
              helperText={errors.appointmentTime}
            />
          </Box>

          {/* Reason */}
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Reason for Visit"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              error={!!errors.reason}
              helperText={errors.reason}
            />
          </Box>

          {/* Buttons */}
          <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
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
