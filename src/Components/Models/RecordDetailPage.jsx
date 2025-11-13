// import React, { useEffect, useState } from "react";
// import { useParams , useNavigate} from "react-router-dom";
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
//   Button,
//   TextField,
//   Box,
//   Card,
//   CardContent,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Table,
//   TableHead,
//   Divider,
//   Grid,
//   Modal,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import AddIcon from "@mui/icons-material/Add";
// import { fetchRecordById, fetchRecordVisits } from "../../DAL/fetch";
// import { deleteRecordVisit } from "../../DAL/delete";
// import { createRecordVisit } from "../../DAL/create";
// import { updateRecordVisit } from "../../DAL/edit"; // ✅ Import update API
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useAlert } from "../Alert/AlertContext";
// const RecordDetailPage = () => {
//   const { recordId } = useParams();
//   const [record, setRecord] = useState(null);
//   const [visits, setVisits] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [editingVisitId, setEditingVisitId] = useState(null);
//   const navigate = useNavigate();
//   const {showAlert} = useAlert();
//   const [newVisit, setNewVisit] = useState({
//     visitDate: "",
//     visitTime: "",
//     reason: "",
//     dues: "",
//     prescriptions: [],
//   });

//   // Fetch record and visits
//   const loadRecord = async () => {
//     try {
//       const res = await fetchRecordById(recordId);
//       setRecord(res);
//     } catch (err) {
//       console.error("Error fetching record:", err);
//     }
//   };

//   const loadVisits = async () => {
//     try {
//       const res = await fetchRecordVisits(recordId);
//       setVisits(res?.visits || []);
//     } catch (err) {
//       console.error("Error fetching visits:", err);
//     }
//   };

//   useEffect(() => {
//     if (recordId) {
//       loadRecord();
//       loadVisits();
//     }
//   }, [recordId]);

//   // Handle field changes
//   const handleChange = (e) => {
//     setNewVisit({ ...newVisit, [e.target.name]: e.target.value });
//   };

//   const handlePrescriptionChange = (index, field, value) => {
//     const updated = [...newVisit.prescriptions];
//     updated[index][field] = value;
//     setNewVisit({ ...newVisit, prescriptions: updated });
//   };

//   const addPrescriptionField = () => {
//     setNewVisit({
//       ...newVisit,
//       prescriptions: [
//         ...newVisit.prescriptions,
//         { medicineName: "", dosage: "", frequency: "", duration: "" },
//       ],
//     });
//   };

//   const handleAddVisit = async () => {
//     try {
//       await createRecordVisit(recordId, newVisit);
//       resetModal();
//       loadVisits();
//     } catch (err) {
//       console.error("Error adding visit:", err);
//     }
//   };

//   const handleEditVisit = (visit) => {
//     setEditingVisitId(visit._id);
//     setNewVisit({
//       visitDate: visit.visitDate.split("T")[0],
//       visitTime: visit.visitTime,
//       reason: visit.reason,
//       dues: visit.dues,
//       prescriptions: visit.prescriptions || [],
//     });
//     setOpenModal(true);
//   };

//   const handleUpdateVisit = async () => {
//     try {
//       await updateRecordVisit(recordId, editingVisitId, newVisit);
//       resetModal();
//       loadVisits();
//     } catch (err) {
//       console.error("Error updating visit:", err);
//     }
//   };

//   const handleDeleteVisit = async (visitId) => {
//     try {
//       await deleteRecordVisit(recordId, visitId);
//       loadVisits();
//     } catch (err) {
//       console.error("Error deleting visit:", err);
//     }
//   };

//   const resetModal = () => {
//     setNewVisit({
//       visitDate: "",
//       visitTime: "",
//       reason: "",
//       dues: "",
//       prescriptions: [],
//     });
//     setOpenModal(false);
//     setEditingVisitId(null);
//   };

//   return (
//     <Box sx={{ padding: 3 }}>
//        <Button
//         startIcon={<ArrowBackIcon />}
//         onClick={() => navigate("/records")}
//         sx={{ mb: 2 }}
//         variant="outlined"
//       >
//         Back to Records Page
//       </Button>

//       {/* Record Info */}
//       {record && (
//         <Card sx={{ mb: 4, p: 2, boxShadow: 3, borderRadius: 3 }}>
//           <CardContent>
//             <Typography variant="h5"sx={{ color: "var(--primary-color)" }}>
//               Record Details
//             </Typography>
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <Typography><b>Patient Name:</b> {record.patientName}</Typography>
//                 <Typography><b>Appointment Date:</b> {new Date(record.appointmentDate).toLocaleDateString()}</Typography>
//                 <Typography><b>Appointment Time:</b> {record.appointmentTime}</Typography>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography><b>Reason:</b> {record.reason}</Typography>
//                 <Typography><b>Prescription:</b> {record.prescription}</Typography>
//                 <Typography><b>Dues:</b> {record.dues}</Typography>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
//       )}

//       {/* Visits Header */}
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//         <Typography variant="h5" sx={{ color: "var(--primary-color)" }}>
//           Record Visits ({visits.length})
//         </Typography>
//         <Button
//           startIcon={<AddIcon />}
//           variant="contained"
//           sx={{ background: "#B22222" }}
//           onClick={() => setOpenModal(true)}
//         >
//           Add Visit
//         </Button>
//       </Box>

//       {/* Add/Edit Visit Modal */}
//       <Modal open={openModal} onClose={resetModal}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             bgcolor: "background.paper",
//             p: 4,
//             borderRadius: 2,
//             boxShadow: 24,
//             width: "55%",
//           }}
//         >
//           <Typography variant="h6" gutterBottom>
//             {editingVisitId ? "Edit Visit" : "Add New Visit"}
//           </Typography>
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//             <TextField label="Date" type="date" name="visitDate" value={newVisit.visitDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
//             <TextField label="Time" type="time" name="visitTime" value={newVisit.visitTime} onChange={handleChange} InputLabelProps={{ shrink: true }} />
//             <TextField label="Reason" name="reason" value={newVisit.reason} onChange={handleChange} />

//             <Typography variant="subtitle1" fontWeight="bold">Prescriptions</Typography>
//             {newVisit.prescriptions.map((p, index) => (
//               <Box key={index} sx={{ display: "flex", gap: 2 }}>
//                 <TextField label="Medicine" value={p.medicineName} onChange={(e) => handlePrescriptionChange(index, "medicineName", e.target.value)} />
//                 <TextField label="Dosage" value={p.dosage} onChange={(e) => handlePrescriptionChange(index, "dosage", e.target.value)} />
//                 <TextField label="Frequency" value={p.frequency} onChange={(e) => handlePrescriptionChange(index, "frequency", e.target.value)} />
//                 <TextField label="Duration" value={p.duration} onChange={(e) => handlePrescriptionChange(index, "duration", e.target.value)} />
//               </Box>
//             ))}
//             <Button onClick={addPrescriptionField}>+ Add Medicine</Button>

//             <TextField label="Dues" type="number" name="dues" value={newVisit.dues} onChange={handleChange} />
//             <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
//               <Button onClick={resetModal} variant="outlined" color="secondary">Cancel</Button>
//               <Button variant="contained" sx={{ background: "#B22222" }} onClick={editingVisitId ? handleUpdateVisit : handleAddVisit}>
//                 {editingVisitId ? "Update" : "Submit"}
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//       </Modal>

//       {/* Visits List */}
//       {visits.length === 0 ? (
//         <Typography>No visits found</Typography>
//       ) : (
//         visits.map((visit) => (
//           <Accordion key={visit._id} sx={{ mb: 2, borderRadius: 2 }}>
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Typography fontWeight="bold">
//                 📅 {new Date(visit.visitDate).toLocaleDateString()}
//               </Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography><b>Time:</b> {visit.visitTime}</Typography>
//               <Typography><b>Reason:</b> {visit.reason}</Typography>
//               <Typography><b>Dues:</b> {visit.dues}</Typography>

//               <Typography fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
//                 Prescriptions:
//               </Typography>

//               {visit.prescriptions?.length > 0 ? (
//                 <TableContainer component={Card} sx={{ borderRadius: 2, boxShadow: 2 }}>
//                   <Table size="small">
//                     <TableHead>
//                       <TableRow>
//                         <TableCell align="center"><b>Medicine</b></TableCell>
//                         <TableCell align="center"><b>Dosage</b></TableCell>
//                         <TableCell align="center"><b>Frequency</b></TableCell>
//                         <TableCell align="center"><b>Duration</b></TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {visit.prescriptions.map((p, i) => (
//                         <TableRow key={i}>
//                           <TableCell align="center">{p.medicineName}</TableCell>
//                           <TableCell align="center">{p.dosage}</TableCell>
//                           <TableCell align="center">{p.frequency}</TableCell>
//                           <TableCell align="center">{p.duration}</TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               ) : (
//                 <Typography color="text.secondary" sx={{ ml: 1 }}>
//                   No prescriptions added.
//                 </Typography>
//               )}

//               <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//                 <Button startIcon={<EditIcon />} color="primary" variant="outlined" size="small" onClick={() => handleEditVisit(visit)}>
//                   Edit
//                 </Button>
//                 <Button startIcon={<DeleteIcon />} color="error" variant="outlined" size="small" onClick={() => handleDeleteVisit(visit._id)}>
//                   Delete
//                 </Button>
//               </Box>
//             </AccordionDetails>
//           </Accordion>
//         ))
//       )}
//     </Box>
//   );
// };

// export default RecordDetailPage;
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
//   Button,
//   TextField,
//   Box,
//   Card,
//   CardContent,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Table,
//   TableHead,
//   Divider,
//   Grid,
//   Modal,
//   Alert,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import AddIcon from "@mui/icons-material/Add";
// import { fetchRecordById, fetchRecordVisits } from "../../DAL/fetch";
// import { deleteRecordVisit } from "../../DAL/delete";
// import { createRecordVisit } from "../../DAL/create";
// import { updateRecordVisit } from "../../DAL/edit";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useAlert } from "../Alert/AlertContext";

// const RecordDetailPage = () => {
//   const { recordId } = useParams();
//   const [record, setRecord] = useState(null);
//   const [visits, setVisits] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [editingVisitId, setEditingVisitId] = useState(null);
//   const navigate = useNavigate();
//   const { showAlert } = useAlert();
//   const [errors, setErrors] = useState({});
//   const [newVisit, setNewVisit] = useState({
//     visitDate: "",
//     visitTime: "",
//     reason: "",
//     dues: "",
//     prescriptions: [],
//   });

//   // Fetch record and visits
//   const loadRecord = async () => {
//     try {
//       const res = await fetchRecordById(recordId);
//       setRecord(res);
//     } catch (err) {
//       console.error("Error fetching record:", err);
//       showAlert("Failed to load record details", "error");
//     }
//   };

//   const loadVisits = async () => {
//     try {
//       const res = await fetchRecordVisits(recordId);
//       setVisits(res?.visits || []);
//     } catch (err) {
//       console.error("Error fetching visits:", err);
//       showAlert("Failed to load visits", "error");
//     }
//   };

//   useEffect(() => {
//     if (recordId) {
//       loadRecord();
//       loadVisits();
//     }
//   }, [recordId]);

//   // Validation function
//   const validateForm = () => {
//     const newErrors = {};

//     // Validate visit date
//     if (!newVisit.visitDate.trim()) {
//       newErrors.visitDate = "Visit date is required";
//     }

//     // Validate visit time
//     if (!newVisit.visitTime.trim()) {
//       newErrors.visitTime = "Visit time is required";
//     }

//     // Validate reason
//     if (!newVisit.reason.trim()) {
//       newErrors.reason = "Reason for visit is required";
//     } else if (newVisit.reason.trim().length < 3) {
//       newErrors.reason = "Reason must be at least 3 characters long";
//     }

//     // Validate dues
//     if (!newVisit.dues) {
//       newErrors.dues = "Dues amount is required";
//     } else if (parseFloat(newVisit.dues) < 0) {
//       newErrors.dues = "Dues cannot be negative";
//     } else if (isNaN(parseFloat(newVisit.dues))) {
//       newErrors.dues = "Dues must be a valid number";
//     }

//     // Validate prescriptions
//     if (newVisit.prescriptions.length > 0) {
//       newVisit.prescriptions.forEach((prescription, index) => {
//         if (!prescription.medicineName.trim()) {
//           newErrors[`prescription_${index}_medicineName`] = "Medicine name is required";
//         }
//         if (!prescription.dosage.trim()) {
//           newErrors[`prescription_${index}_dosage`] = "Dosage is required";
//         }
//         if (!prescription.frequency.trim()) {
//           newErrors[`prescription_${index}_frequency`] = "Frequency is required";
//         }
//         if (!prescription.duration.trim()) {
//           newErrors[`prescription_${index}_duration`] = "Duration is required";
//         }
//       });
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle field changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     // Prevent negative numbers for dues field
//     if (name === "dues" && value !== "" && parseFloat(value) < 0) {
//       return;
//     }

//     setNewVisit({ ...newVisit, [name]: value });
    
//     // Clear error for this field when user starts typing
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   const handlePrescriptionChange = (index, field, value) => {
//     const updated = [...newVisit.prescriptions];
//     updated[index][field] = value;
//     setNewVisit({ ...newVisit, prescriptions: updated });
    
//     // Clear error for this prescription field
//     const errorKey = `prescription_${index}_${field}`;
//     if (errors[errorKey]) {
//       setErrors({ ...errors, [errorKey]: "" });
//     }
//   };

//   const addPrescriptionField = () => {
//     setNewVisit({
//       ...newVisit,
//       prescriptions: [
//         ...newVisit.prescriptions,
//         { medicineName: "", dosage: "", frequency: "", duration: "" },
//       ],
//     });
//   };

//   const removePrescriptionField = (index) => {
//     const updated = newVisit.prescriptions.filter((_, i) => i !== index);
//     setNewVisit({ ...newVisit, prescriptions: updated });
    
//     // Clear errors for removed prescription
//     const newErrors = { ...errors };
//     ['medicineName', 'dosage', 'frequency', 'duration'].forEach(field => {
//       delete newErrors[`prescription_${index}_${field}`];
//     });
//     setErrors(newErrors);
//   };

//   const handleAddVisit = async () => {
//     if (!validateForm()) {
//       showAlert("Please fix all validation errors before submitting", "error");
//       return;
//     }

//     try {
//       await createRecordVisit(recordId, newVisit);
//       showAlert("Visit added successfully", "success");
//       resetModal();
//       loadVisits();
//     } catch (err) {
//       console.error("Error adding visit:", err);
//       showAlert("Failed to add visit", "error");
//     }
//   };

//   const handleEditVisit = (visit) => {
//     setEditingVisitId(visit._id);
//     setNewVisit({
//       visitDate: visit.visitDate.split("T")[0],
//       visitTime: visit.visitTime,
//       reason: visit.reason,
//       dues: visit.dues,
//       prescriptions: visit.prescriptions || [],
//     });
//     setErrors({});
//     setOpenModal(true);
//   };

//   const handleUpdateVisit = async () => {
//     if (!validateForm()) {
//       showAlert("Please fix all validation errors before updating", "error");
//       return;
//     }

//     try {
//       await updateRecordVisit(recordId, editingVisitId, newVisit);
//       showAlert("Visit updated successfully", "success");
//       resetModal();
//       loadVisits();
//     } catch (err) {
//       console.error("Error updating visit:", err);
//       showAlert("Failed to update visit", "error");
//     }
//   };

//   const handleDeleteVisit = async (visitId) => {
//     if (window.confirm("Are you sure you want to delete this visit?")) {
//       try {
//         await deleteRecordVisit(recordId, visitId);
//         showAlert("Visit deleted successfully", "success");
//         loadVisits();
//       } catch (err) {
//         console.error("Error deleting visit:", err);
//         showAlert("Failed to delete visit", "error");
//       }
//     }
//   };

//   const resetModal = () => {
//     setNewVisit({
//       visitDate: "",
//       visitTime: "",
//       reason: "",
//       dues: "",
//       prescriptions: [],
//     });
//     setErrors({});
//     setOpenModal(false);
//     setEditingVisitId(null);
//   };

//   return (
//     <Box sx={{ padding: 3 }}>
//       <Button
//         startIcon={<ArrowBackIcon />}
//         onClick={() => navigate("/records")}
//         sx={{ mb: 2 }}
//         variant="outlined"
//       >
//         Back to Records Page
//       </Button>

//       {/* Record Info */}
//       {record && (
//         <Card sx={{ mb: 4, p: 2, boxShadow: 3, borderRadius: 3 }}>
//           <CardContent>
//             <Typography variant="h5" sx={{ color: "var(--primary-color)" }}>
//               Record Details
//             </Typography>
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <Typography><b>Patient Name:</b> {record.patientName}</Typography>
//                 <Typography><b>Appointment Date:</b> {new Date(record.appointmentDate).toLocaleDateString()}</Typography>
//                 <Typography><b>Appointment Time:</b> {record.appointmentTime}</Typography>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography><b>Reason:</b> {record.reason}</Typography>
//                 <Typography><b>Prescription:</b> {record.prescription}</Typography>
//                 <Typography><b>Dues:</b> {record.dues}</Typography>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
//       )}

//       {/* Visits Header */}
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//         <Typography variant="h5" sx={{ color: "var(--primary-color)" }}>
//           Record Visits ({visits.length})
//         </Typography>
//         <Button
//           startIcon={<AddIcon />}
//           variant="contained"
//           sx={{ background: "#B22222" }}
//           onClick={() => setOpenModal(true)}
//         >
//           Add Visit
//         </Button>
//       </Box>

//       {/* Add/Edit Visit Modal */}
//       <Modal open={openModal} onClose={resetModal}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             bgcolor: "background.paper",
//             p: 4,
//             borderRadius: 2,
//             boxShadow: 24,
//             width: "55%",
//             maxHeight: "90vh",
//             overflowY: "auto",
//           }}
//         >
//           <Typography variant="h6" gutterBottom>
//             {editingVisitId ? "Edit Visit" : "Add New Visit"}
//           </Typography>

//           {Object.keys(errors).length > 0 && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               Please fix the errors below before submitting
//             </Alert>
//           )}

//           <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//             <TextField
//               label="Date"
//               type="date"
//               name="visitDate"
//               value={newVisit.visitDate}
//               onChange={handleChange}
//               InputLabelProps={{ shrink: true }}
//               required
//               error={!!errors.visitDate}
//               helperText={errors.visitDate}
//             />

//             <TextField
//               label="Time"
//               type="time"
//               name="visitTime"
//               value={newVisit.visitTime}
//               onChange={handleChange}
//               InputLabelProps={{ shrink: true }}
//               required
//               error={!!errors.visitTime}
//               helperText={errors.visitTime}
//             />

//             <TextField
//               label="Reason"
//               name="reason"
//               value={newVisit.reason}
//               onChange={handleChange}
//               required
//               multiline
//               rows={2}
//               error={!!errors.reason}
//               helperText={errors.reason}
//             />

//             <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1 }}>
//               Prescriptions
//             </Typography>

//             {newVisit.prescriptions.map((p, index) => (
//               <Box key={index} sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2, position: "relative" }}>
//                 <Typography variant="subtitle2" sx={{ mb: 1 }}>
//                   Medicine {index + 1}
//                 </Typography>
//                 <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//                   <TextField
//                     label="Medicine Name"
//                     value={p.medicineName}
//                     onChange={(e) => handlePrescriptionChange(index, "medicineName", e.target.value)}
//                     required
//                     error={!!errors[`prescription_${index}_medicineName`]}
//                     helperText={errors[`prescription_${index}_medicineName`]}
//                   />
//                   <Box sx={{ display: "flex", gap: 2 }}>
//                     <TextField
//                       label="Dosage"
//                       value={p.dosage}
//                       onChange={(e) => handlePrescriptionChange(index, "dosage", e.target.value)}
//                       required
//                       fullWidth
//                       error={!!errors[`prescription_${index}_dosage`]}
//                       helperText={errors[`prescription_${index}_dosage`]}
//                     />
//                     <TextField
//                       label="Frequency"
//                       value={p.frequency}
//                       onChange={(e) => handlePrescriptionChange(index, "frequency", e.target.value)}
//                       required
//                       fullWidth
//                       error={!!errors[`prescription_${index}_frequency`]}
//                       helperText={errors[`prescription_${index}_frequency`]}
//                     />
//                     <TextField
//                       label="Duration"
//                       value={p.duration}
//                       onChange={(e) => handlePrescriptionChange(index, "duration", e.target.value)}
//                       required
//                       fullWidth
//                       error={!!errors[`prescription_${index}_duration`]}
//                       helperText={errors[`prescription_${index}_duration`]}
//                     />
//                   </Box>
//                 </Box>
//                 {newVisit.prescriptions.length > 1 && (
//                   <Button
//                     startIcon={<DeleteIcon />}
//                     color="error"
//                     size="small"
//                     onClick={() => removePrescriptionField(index)}
//                     sx={{ mt: 1 }}
//                   >
//                     Remove
//                   </Button>
//                 )}
//               </Box>
//             ))}

//             <Button onClick={addPrescriptionField} variant="outlined">
//               + Add Medicine
//             </Button>

//             <TextField
//               label="Dues"
//               type="number"
//               name="dues"
//               value={newVisit.dues}
//               onChange={handleChange}
//               required
//               inputProps={{ min: 0, step: "0.01" }}
//               error={!!errors.dues}
//               helperText={errors.dues}
//             />

//             <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
//               <Button onClick={resetModal} variant="outlined" color="secondary">
//                 Cancel
//               </Button>
//               <Button
//                 variant="contained"
//                 sx={{ background: "#B22222" }}
//                 onClick={editingVisitId ? handleUpdateVisit : handleAddVisit}
//               >
//                 {editingVisitId ? "Update" : "Submit"}
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//       </Modal>

//       {/* Visits List */}
//       {visits.length === 0 ? (
//         <Typography>No visits found</Typography>
//       ) : (
//         visits.map((visit) => (
//           <Accordion key={visit._id} sx={{ mb: 2, borderRadius: 2 }}>
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Typography fontWeight="bold">
//                 📅 {new Date(visit.visitDate).toLocaleDateString()}
//               </Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography><b>Time:</b> {visit.visitTime}</Typography>
//               <Typography><b>Reason:</b> {visit.reason}</Typography>
//               <Typography><b>Dues:</b> {visit.dues}</Typography>

//               <Typography fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
//                 Prescriptions:
//               </Typography>

//               {visit.prescriptions?.length > 0 ? (
//                 <TableContainer component={Card} sx={{ borderRadius: 2, boxShadow: 2 }}>
//                   <Table size="small">
//                     <TableHead>
//                       <TableRow>
//                         <TableCell align="center"><b>Medicine</b></TableCell>
//                         <TableCell align="center"><b>Dosage</b></TableCell>
//                         <TableCell align="center"><b>Frequency</b></TableCell>
//                         <TableCell align="center"><b>Duration</b></TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {visit.prescriptions.map((p, i) => (
//                         <TableRow key={i}>
//                           <TableCell align="center">{p.medicineName}</TableCell>
//                           <TableCell align="center">{p.dosage}</TableCell>
//                           <TableCell align="center">{p.frequency}</TableCell>
//                           <TableCell align="center">{p.duration}</TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               ) : (
//                 <Typography color="text.secondary" sx={{ ml: 1 }}>
//                   No prescriptions added.
//                 </Typography>
//               )}

//               <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//                 <Button
//                   startIcon={<EditIcon />}
//                   color="primary"
//                   variant="outlined"
//                   size="small"
//                   onClick={() => handleEditVisit(visit)}
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   startIcon={<DeleteIcon />}
//                   color="error"
//                   variant="outlined"
//                   size="small"
//                   onClick={() => handleDeleteVisit(visit._id)}
//                 >
//                   Delete
//                 </Button>
//               </Box>
//             </AccordionDetails>
//           </Accordion>
//         ))
//       )}
//     </Box>
//   );
// };

// export default RecordDetailPage;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  TextField,
  Box,
  Card,
  CardContent,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Table,
  TableHead,
  Divider,
  Grid,
  Modal,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { fetchRecordById, fetchRecordVisits } from "../../DAL/fetch";
import { deleteRecordVisit } from "../../DAL/delete";
import { createRecordVisit } from "../../DAL/create";
import { updateRecordVisit } from "../../DAL/edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAlert } from "../Alert/AlertContext";

const RecordDetailPage = () => {
  const { recordId } = useParams();
  const [record, setRecord] = useState(null);
  const [visits, setVisits] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingVisitId, setEditingVisitId] = useState(null);
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [errors, setErrors] = useState({});
  const [newVisit, setNewVisit] = useState({
    visitDate: "",
    visitTime: "",
    reason: "",
    dues: "",
    prescriptions: [],
  });

  // Fetch record and visits
  const loadRecord = async () => {
    try {
      const res = await fetchRecordById(recordId);
      setRecord(res);
    } catch (err) {
      console.error("Error fetching record:", err);
      showAlert("Failed to load record details", "error");
    }
  };

  const loadVisits = async () => {
    try {
      const res = await fetchRecordVisits(recordId);
      setVisits(res?.visits || []);
    } catch (err) {
      console.error("Error fetching visits:", err);
      showAlert("Failed to load visits", "error");
    }
  };

  useEffect(() => {
    if (recordId) {
      loadRecord();
      loadVisits();
    }
  }, [recordId]);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Validate visit date
    // if (!newVisit.visitDate.trim()) {
    //   newErrors.visitDate = "Visit date is required";
    // }
 if (!newVisit.visitDate) {
      newErrors.visitDate = "Visit date is required";
    } else {
      const visitDate = new Date(newVisit.visitDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (visitDate > today) {
        newErrors.visitDate = "Visit date cannot be in the future";
      }
    }
    // Validate visit time
    if (!newVisit.visitTime.trim()) {
      newErrors.visitTime = "Visit time is required";
    }

    // Validate reason
    if (!newVisit.reason.trim()) {
      newErrors.reason = "Reason for visit is required";
    } else if (newVisit.reason.trim().length < 3) {
      newErrors.reason = "Reason must be at least 3 characters long";
    }

    // Validate dues
    if (!newVisit.dues) {
      newErrors.dues = "Dues amount is required";
    } else if (parseFloat(newVisit.dues) < 0) {
      newErrors.dues = "Dues cannot be negative";
    } else if (isNaN(parseFloat(newVisit.dues))) {
      newErrors.dues = "Dues must be a valid number";
    }

    // Validate prescriptions
    if (newVisit.prescriptions.length > 0) {
      newVisit.prescriptions.forEach((prescription, index) => {
        if (!prescription.medicineName.trim()) {
          newErrors[`prescription_${index}_medicineName`] = "Medicine name is required";
        }
        if (!prescription.dosage.trim()) {
          newErrors[`prescription_${index}_dosage`] = "Dosage is required";
        }
        if (!prescription.frequency.trim()) {
          newErrors[`prescription_${index}_frequency`] = "Frequency is required";
        }
        if (!prescription.duration.trim()) {
          newErrors[`prescription_${index}_duration`] = "Duration is required";
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Prevent negative numbers for dues field
    if (name === "dues" && value !== "" && parseFloat(value) < 0) {
      return;
    }

    setNewVisit({ ...newVisit, [name]: value });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handlePrescriptionChange = (index, field, value) => {
    const updated = [...newVisit.prescriptions];
    updated[index][field] = value;
    setNewVisit({ ...newVisit, prescriptions: updated });
    
    // Clear error for this prescription field
    const errorKey = `prescription_${index}_${field}`;
    if (errors[errorKey]) {
      setErrors({ ...errors, [errorKey]: "" });
    }
  };

  const addPrescriptionField = () => {
    setNewVisit({
      ...newVisit,
      prescriptions: [
        ...newVisit.prescriptions,
        { medicineName: "", dosage: "", frequency: "", duration: "" },
      ],
    });
  };

  const removePrescriptionField = (index) => {
    const updated = newVisit.prescriptions.filter((_, i) => i !== index);
    setNewVisit({ ...newVisit, prescriptions: updated });
    
    // Clear errors for removed prescription
    const newErrors = { ...errors };
    ['medicineName', 'dosage', 'frequency', 'duration'].forEach(field => {
      delete newErrors[`prescription_${index}_${field}`];
    });
    setErrors(newErrors);
  };

  const handleAddVisit = async () => {
    if (!validateForm()) {
      showAlert("Please fix all validation errors before submitting", "error");
      return;
    }

    try {
      await createRecordVisit(recordId, newVisit);
      showAlert("Visit added successfully", "success");
      resetModal();
      loadVisits();
    } catch (err) {
      console.error("Error adding visit:", err);
      showAlert("Failed to add visit", "error");
    }
  };

  const handleEditVisit = (visit) => {
    setEditingVisitId(visit._id);
    setNewVisit({
      visitDate: visit.visitDate.split("T")[0],
      visitTime: visit.visitTime,
      reason: visit.reason,
      dues: visit.dues,
      prescriptions: visit.prescriptions || [],
    });
    setErrors({});
    setOpenModal(true);
  };

  const handleUpdateVisit = async () => {
    if (!validateForm()) {
      showAlert("Please fix all validation errors before updating", "error");
      return;
    }

    try {
      await updateRecordVisit(recordId, editingVisitId, newVisit);
      showAlert("Visit updated successfully", "success");
      resetModal();
      loadVisits();
    } catch (err) {
      console.error("Error updating visit:", err);
      showAlert("Failed to update visit", "error");
    }
  };

  const handleDeleteVisit = async (visitId) => {
    if (window.confirm("Are you sure you want to delete this visit?")) {
      try {
        await deleteRecordVisit(recordId, visitId);
        showAlert("Visit deleted successfully", "success");
        loadVisits();
      } catch (err) {
        console.error("Error deleting visit:", err);
        showAlert("Failed to delete visit", "error");
      }
    }
  };

  const resetModal = () => {
    setNewVisit({
      visitDate: "",
      visitTime: "",
      reason: "",
      dues: "",
      prescriptions: [],
    });
    setErrors({});
    setOpenModal(false);
    setEditingVisitId(null);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/records")}
        sx={{ mb: 2 }}
        variant="outlined"
      >
        Back to Records Page
      </Button>

      {/* Record Info */}
      {record && (
        <Card sx={{ mb: 4, p: 2, boxShadow: 3, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h5" sx={{ color: "var(--primary-color)" }}>
              Record Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography><b>Patient Name:</b> {record.patientName}</Typography>
                <Typography><b>Appointment Date:</b> {new Date(record.appointmentDate).toLocaleDateString()}</Typography>
                <Typography><b>Appointment Time:</b> {record.appointmentTime}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><b>Reason:</b> {record.reason}</Typography>
                <Typography><b>Prescription:</b> {record.prescription}</Typography>
                <Typography><b>Dues:</b> {record.dues}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Visits Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" sx={{ color: "var(--primary-color)" }}>
          Record Visits ({visits.length})
        </Typography>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          sx={{ background: "#B22222" }}
          onClick={() => setOpenModal(true)}
        >
          Add Visit
        </Button>
      </Box>

      {/* Add/Edit Visit Modal */}
      <Modal open={openModal} onClose={resetModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            width: "55%",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" gutterBottom>
            {editingVisitId ? "Edit Visit" : "Add New Visit"}
          </Typography>

          {Object.keys(errors).length > 0 && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Please fix the errors below before submitting
            </Alert>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Date"
              type="date"
              name="visitDate"
              value={newVisit.visitDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
              error={!!errors.visitDate}
              helperText={errors.visitDate}
            />

            <TextField
              label="Time"
              type="time"
              name="visitTime"
              value={newVisit.visitTime}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
              error={!!errors.visitTime}
              helperText={errors.visitTime}
            />

            <TextField
              label="Reason"
              name="reason"
              value={newVisit.reason}
              onChange={handleChange}
              required
              multiline
              rows={2}
              error={!!errors.reason}
              helperText={errors.reason}
            />

            <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1 }}>
              Prescriptions
            </Typography>

            {newVisit.prescriptions.map((p, index) => (
              <Box key={index} sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2, position: "relative" }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Medicine {index + 1}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    label="Medicine Name"
                    value={p.medicineName}
                    onChange={(e) => handlePrescriptionChange(index, "medicineName", e.target.value)}
                    required
                    error={!!errors[`prescription_${index}_medicineName`]}
                    helperText={errors[`prescription_${index}_medicineName`]}
                  />
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                      label="Dosage"
                      value={p.dosage}
                      onChange={(e) => handlePrescriptionChange(index, "dosage", e.target.value)}
                      required
                      fullWidth
                      error={!!errors[`prescription_${index}_dosage`]}
                      helperText={errors[`prescription_${index}_dosage`]}
                    />
                    <TextField
                      label="Frequency"
                      value={p.frequency}
                      onChange={(e) => handlePrescriptionChange(index, "frequency", e.target.value)}
                      required
                      fullWidth
                      error={!!errors[`prescription_${index}_frequency`]}
                      helperText={errors[`prescription_${index}_frequency`]}
                    />
                    <TextField
                      label="Duration"
                      value={p.duration}
                      onChange={(e) => handlePrescriptionChange(index, "duration", e.target.value)}
                      required
                      fullWidth
                      error={!!errors[`prescription_${index}_duration`]}
                      helperText={errors[`prescription_${index}_duration`]}
                    />
                  </Box>
                </Box>
                {newVisit.prescriptions.length > 1 && (
                  <Button
                    startIcon={<DeleteIcon />}
                    color="error"
                    size="small"
                    onClick={() => removePrescriptionField(index)}
                    sx={{ mt: 1 }}
                  >
                    Remove
                  </Button>
                )}
              </Box>
            ))}

            <Button onClick={addPrescriptionField} variant="outlined">
              + Add Medicine
            </Button>

            <TextField
              label="Dues"
              type="number"
              name="dues"
              value={newVisit.dues}
              onChange={handleChange}
              required
              inputProps={{ min: 0, step: "0.01" }}
              error={!!errors.dues}
              helperText={errors.dues}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
              <Button onClick={resetModal} variant="outlined" color="secondary">
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ background: "#B22222" }}
                onClick={editingVisitId ? handleUpdateVisit : handleAddVisit}
              >
                {editingVisitId ? "Update" : "Submit"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* Visits List */}
      {visits.length === 0 ? (
        <Typography>No visits found</Typography>
      ) : (
        visits.map((visit) => (
          <Accordion key={visit._id} sx={{ mb: 2, borderRadius: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="bold">
                📅 {new Date(visit.visitDate).toLocaleDateString()}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography><b>Time:</b> {visit.visitTime}</Typography>
              <Typography><b>Reason:</b> {visit.reason}</Typography>
              <Typography><b>Dues:</b> {visit.dues}</Typography>

              <Typography fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
                Prescriptions:
              </Typography>

              {visit.prescriptions?.length > 0 ? (
                <TableContainer component={Card} sx={{ borderRadius: 2, boxShadow: 2 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center"><b>Medicine</b></TableCell>
                        <TableCell align="center"><b>Dosage</b></TableCell>
                        <TableCell align="center"><b>Frequency</b></TableCell>
                        <TableCell align="center"><b>Duration</b></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {visit.prescriptions.map((p, i) => (
                        <TableRow key={i}>
                          <TableCell align="center">{p.medicineName}</TableCell>
                          <TableCell align="center">{p.dosage}</TableCell>
                          <TableCell align="center">{p.frequency}</TableCell>
                          <TableCell align="center">{p.duration}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography color="text.secondary" sx={{ ml: 1 }}>
                  No prescriptions added.
                </Typography>
              )}

              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button
                  startIcon={<EditIcon />}
                  color="primary"
                  variant="outlined"
                  size="small"
                  onClick={() => handleEditVisit(visit)}
                >
                  Edit
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
                  color="error"
                  variant="outlined"
                  size="small"
                  onClick={() => handleDeleteVisit(visit._id)}
                >
                  Delete
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Box>
  );
};

export default RecordDetailPage;


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
//   Button,
//   TextField,
//   Box,
//   Card,
//   CardContent,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Table,
//   TableHead,
//   Divider,
//   Grid,
//   Modal,
//   Snackbar,
//   Alert,
//   IconButton,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import AddIcon from "@mui/icons-material/Add";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import CloseIcon from "@mui/icons-material/Close";
// import { fetchRecordById, fetchRecordVisits } from "../../DAL/fetch";
// import { deleteRecordVisit } from "../../DAL/delete";
// import { createRecordVisit } from "../../DAL/create";
// import { updateRecordVisit } from "../../DAL/edit";
// import { useAlert } from "../Alert/AlertContext";

// const RecordDetailPage = () => {
//   const { recordId } = useParams();
//   const navigate = useNavigate();
//   const [record, setRecord] = useState(null);
//   const [visits, setVisits] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [editingVisitId, setEditingVisitId] = useState(null);
//   const [errors, setErrors] = useState({});
//   const {showAlert} = useAlert();

//   // 🔹 Snackbar State
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const [newVisit, setNewVisit] = useState({
//     visitDate: "",
//     visitTime: "",
//     reason: "",
//     dues: "",
//     prescriptions: [],
//   });

//   // 🔹 Date and Time Formatting
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const formatTime = (timeString) => {
//     if (!timeString) return "N/A";
//     const [hours, minutes] = timeString.split(":");
//     const hour = parseInt(hours, 10);
//     const period = hour >= 12 ? "PM" : "AM";
//     const formattedHour = hour % 12 || 12;
//     return `${formattedHour}:${minutes} ${period}`;
//   };

//   // 🔹 Snackbar Handler
//   const showSnackbar = (message, severity = "success") => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === "clickaway") return;
//     setSnackbar({ ...snackbar, open: false });
//   };

//   // 🔹 Fetch record and visits
//   const loadRecord = async () => {
//     try {
//       const res = await fetchRecordById(recordId);
//       setRecord(res);
//     } catch (err) {
//       console.error("Error fetching record:", err);
//       showSnackbar("Failed to load record details", "error");
//     }
//   };

//   const loadVisits = async () => {
//     try {
//       const res = await fetchRecordVisits(recordId);
//       setVisits(res?.visits || []);
//     } catch (err) {
//       console.error("Error fetching visits:", err);
//       showSnackbar("Failed to load visits", "error");
//     }
//   };

//   useEffect(() => {
//     if (recordId) {
//       loadRecord();
//       loadVisits();
//     }
//   }, [recordId]);

//   // 🔹 Field Handlers
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewVisit({ ...newVisit, [name]: value });
    
//     // Clear error for this field
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   const handlePrescriptionChange = (index, field, value) => {
//     const updated = [...newVisit.prescriptions];
//     updated[index][field] = value;
//     setNewVisit({ ...newVisit, prescriptions: updated });
    
//     // Clear error for this field
//     const errorKey = `${field}_${index}`;
//     if (errors[errorKey]) {
//       setErrors({ ...errors, [errorKey]: "" });
//     }
//   };

//   const addPrescriptionField = () => {
//     setNewVisit({
//       ...newVisit,
//       prescriptions: [
//         ...newVisit.prescriptions,
//         { medicineName: "", dosage: "", frequency: "", duration: "" },
//       ],
//     });
//   };

//   const removePrescriptionField = (index) => {
//     const updated = newVisit.prescriptions.filter((_, i) => i !== index);
//     setNewVisit({ ...newVisit, prescriptions: updated });
    
//     // Clear errors related to removed prescription
//     const newErrors = { ...errors };
//     Object.keys(newErrors).forEach(key => {
//       if (key.endsWith(`_${index}`)) {
//         delete newErrors[key];
//       }
//     });
//     setErrors(newErrors);
//   };

//   // 🔹 Comprehensive Validation
//   const validateVisit = () => {
//     const newErrors = {};
    
//     // Validate date
//     if (!newVisit.visitDate) {
//       newErrors.visitDate = "Visit date is required";
//     } else {
//       const visitDate = new Date(newVisit.visitDate);
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
      
//       if (visitDate > today) {
//         newErrors.visitDate = "Visit date cannot be in the future";
//       }
//     }
    
//     // Validate time
//     if (!newVisit.visitTime) {
//       newErrors.visitTime = "Visit time is required";
//     }
    
//     // Validate reason
//     if (!newVisit.reason || !newVisit.reason.trim()) {
//       newErrors.reason = "Reason is required";
//     } else if (newVisit.reason.trim().length < 3) {
//       newErrors.reason = "Reason must be at least 3 characters";
//     } else if (newVisit.reason.trim().length > 500) {
//       newErrors.reason = "Reason must not exceed 500 characters";
//     }
    
//     // Validate dues
//     if (!newVisit.dues && newVisit.dues !== 0) {
//       newErrors.dues = "Dues amount is required";
//     } else if (isNaN(newVisit.dues)) {
//       newErrors.dues = "Dues must be a valid number";
//     } else if (Number(newVisit.dues) < 0) {
//       newErrors.dues = "Dues cannot be negative";
//     } else if (Number(newVisit.dues) > 1000000) {
//       newErrors.dues = "Dues amount is too large";
//     }
    
//     // Validate prescriptions
//     if (newVisit.prescriptions.length === 0) {
//       newErrors.prescriptions = "At least one prescription is required";
//     } else {
//       newVisit.prescriptions.forEach((p, i) => {
//         // Medicine name validation
//         if (!p.medicineName || !p.medicineName.trim()) {
//           newErrors[`medicineName_${i}`] = "Medicine name is required";
//         } else if (p.medicineName.trim().length < 2) {
//           newErrors[`medicineName_${i}`] = "Medicine name must be at least 2 characters";
//         } else if (p.medicineName.trim().length > 100) {
//           newErrors[`medicineName_${i}`] = "Medicine name is too long";
//         }
        
//         // Dosage validation
//         if (!p.dosage || !p.dosage.trim()) {
//           newErrors[`dosage_${i}`] = "Dosage is required";
//         } else if (p.dosage.trim().length > 50) {
//           newErrors[`dosage_${i}`] = "Dosage is too long";
//         }
        
//         // Frequency validation
//         if (!p.frequency || !p.frequency.trim()) {
//           newErrors[`frequency_${i}`] = "Frequency is required";
//         } else if (p.frequency.trim().length > 50) {
//           newErrors[`frequency_${i}`] = "Frequency is too long";
//         }
        
//         // Duration validation
//         if (!p.duration || !p.duration.trim()) {
//           newErrors[`duration_${i}`] = "Duration is required";
//         } else if (p.duration.trim().length > 50) {
//           newErrors[`duration_${i}`] = "Duration is too long";
//         }
//       });
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // 🔹 Add Visit
//   const handleAddVisit = async () => {
//     if (!validateVisit()) {
//       showSnackbar("Please fix all validation errors", "error");
//       return;
//     }

//     try {
//       const response = await createRecordVisit(recordId, newVisit);
      
//       if (response?.status === 200 || response?.status === 201) {
//         showSnackbar("Visit added successfully!", "success");
//         showAlert("success",response.message || 'Added successfully')
//         resetModal();
//         await loadVisits();
//       } else if (response?.status === 400) {
//         if (response?.missingFields) {
//           const backendErrors = {};
//           response.missingFields.forEach((f) => {
//             backendErrors[f.name] = f.message;
//           });
//           setErrors(backendErrors);
//         }
//         showSnackbar(response?.message || "Failed to add visit", "error");
//       } else {
//         showSnackbar("Failed to add visit", "error");
//       }
//     } catch (err) {
//       console.error("Error adding visit:", err);
//       showSnackbar("An error occurred while adding visit", "error");
//     }
//   };

//   // 🔹 Edit Visit
//   const handleEditVisit = (visit) => {
//     setEditingVisitId(visit._id);
//     setNewVisit({
//       visitDate: visit.visitDate?.split("T")[0] || "",
//       visitTime: visit.visitTime || "",
//       reason: visit.reason || "",
//       dues: visit.dues || "",
//       prescriptions: visit.prescriptions || [],
//     });
//     setErrors({});
//     setOpenModal(true);
//   };

//   // 🔹 Update Visit
//   const handleUpdateVisit = async () => {
//     if (!validateVisit()) {
//       showSnackbar("Please fix all validation errors", "error");
//       return;
//     }

//     try {
//       const response = await updateRecordVisit(recordId, editingVisitId, newVisit);
      
//       if (response?.status === 200 || response?.status === 201) {
//         showSnackbar("Visit updated successfully!", "success");
//         resetModal();
//         await loadVisits();
//       } else if (response?.status === 400) {
//         if (response?.missingFields) {
//           const backendErrors = {};
//           response.missingFields.forEach((f) => {
//             backendErrors[f.name] = f.message;
//           });
//           setErrors(backendErrors);
//         }
//         showSnackbar(response?.message || "Failed to update visit", "error");
//       } else {
//         showSnackbar("Failed to update visit", "error");
//       }
//     } catch (err) {
//       console.error("Error updating visit:", err);
//       showSnackbar("An error occurred while updating visit", "error");
//     }
//   };

//   // 🔹 Delete Visit
//   const handleDeleteVisit = async (visitId) => {
//     if (!window.confirm("Are you sure you want to delete this visit?")) return;

//     try {
//       const response = await deleteRecordVisit(recordId, visitId);
      
//       if (response?.status === 200 || response?.status === 204 || response?.message === "success") {
//         showSnackbar("Visit deleted successfully!", "success");
//         await loadVisits();
//       } else {
//         showSnackbar("Failed to delete visit", "error");
//       }
//     } catch (err) {
//       console.error("Error deleting visit:", err);
//       showSnackbar("An error occurred while deleting visit", "error");
//     }
//   };

//   // 🔹 Reset Modal
//   const resetModal = () => {
//     setNewVisit({
//       visitDate: "",
//       visitTime: "",
//       reason: "",
//       dues: "",
//       prescriptions: [],
//     });
//     setErrors({});
//     setEditingVisitId(null);
//     setOpenModal(false);
//   };

//   return (
//     <Box sx={{ padding: 3 }}>
//       {/* 🔹 Snackbar Notification */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//           variant="filled"
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>

//       {/* 🔹 Back Button */}
//       <Button
//         startIcon={<ArrowBackIcon />}
//         onClick={() => navigate("/records")}
//         sx={{ mb: 2 }}
//         variant="outlined"
//       >
//         Back to Records
//       </Button>

//       {/* 🔹 Record Info */}
//       {record && (
//         <Card sx={{ mb: 4, p: 2, boxShadow: 3, borderRadius: 3 }}>
//           <CardContent>
//             <Typography variant="h5" sx={{ color: "var(--primary-color)" }}>
//               Record Details
//             </Typography>
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <Typography><b>Patient Name:</b> {record.patientName}</Typography>
//                 <Typography><b>Appointment Date:</b> {formatDate(record.appointmentDate)}</Typography>
//                 <Typography><b>Appointment Time:</b> {formatTime(record.appointmentTime)}</Typography>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography><b>Reason:</b> {record.reason}</Typography>
//                 <Typography><b>Prescription:</b> {record.prescription}</Typography>
//                 <Typography><b>Dues:</b> Rs. {record.dues}</Typography>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
//       )}

//       {/* 🔹 Visits Header */}
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//         <Typography variant="h5" sx={{ color: "var(--primary-color)" }}>
//           Record Visits ({visits.length})
//         </Typography>
//         <Button
//           startIcon={<AddIcon />}
//           variant="contained"
//           sx={{ background: "#B22222", "&:hover": { background: "#8B0000" } }}
//           onClick={() => setOpenModal(true)}
//         >
//           Add Visit
//         </Button>
//       </Box>

//       {/* 🔹 Add/Edit Visit Modal */}
//       <Modal open={openModal} onClose={resetModal}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             bgcolor: "background.paper",
//             p: 4,
//             borderRadius: 2,
//             boxShadow: 24,
//             width: { xs: "90%", sm: "70%", md: "55%" },
//             maxHeight: "90vh",
//             overflowY: "auto",
//           }}
//         >
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//             <Typography variant="h6">
//               {editingVisitId ? "Edit Visit" : "Add New Visit"}
//             </Typography>
//             <IconButton onClick={resetModal} size="small">
//               <CloseIcon />
//             </IconButton>
//           </Box>

//           <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//             {/* Date Field */}
//             <TextField
//               label="Visit Date"
//               type="date"
//               name="visitDate"
//               value={newVisit.visitDate}
//               onChange={handleChange}
//               InputLabelProps={{ shrink: true }}
//               error={!!errors.visitDate}
//               helperText={errors.visitDate}
//               fullWidth
//               required
//             />

//             {/* Time Field */}
//             <TextField
//               label="Visit Time"
//               type="time"
//               name="visitTime"
//               value={newVisit.visitTime}
//               onChange={handleChange}
//               InputLabelProps={{ shrink: true }}
//               error={!!errors.visitTime}
//               helperText={errors.visitTime}
//               fullWidth
//               required
//             />

//             {/* Reason Field */}
//             <TextField
//               label="Reason for Visit"
//               name="reason"
//               value={newVisit.reason}
//               onChange={handleChange}
//               error={!!errors.reason}
//               helperText={errors.reason}
//               multiline
//               rows={3}
//               fullWidth
//               required
//               placeholder="Enter the reason for visit (min 3 characters)"
//             />

//             {/* Prescriptions Section */}
//             <Divider sx={{ my: 1 }} />
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <Typography variant="subtitle1" fontWeight="bold">
//                 Prescriptions *
//               </Typography>
//               {errors.prescriptions && (
//                 <Typography variant="caption" color="error">
//                   {errors.prescriptions}
//                 </Typography>
//               )}
//             </Box>

//             {newVisit.prescriptions.length === 0 && (
//               <Typography variant="body2" color="text.secondary">
//                 No prescriptions added. Click "Add Medicine" to add prescriptions.
//               </Typography>
//             )}

//             {newVisit.prescriptions.map((p, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   border: "1px solid #ddd",
//                   p: 2,
//                   borderRadius: 1,
//                   backgroundColor: "#f9f9f9",
//                 }}
//               >
//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                   <Typography variant="caption" fontWeight="bold">
//                     Medicine #{index + 1}
//                   </Typography>
//                   <IconButton
//                     size="small"
//                     color="error"
//                     onClick={() => removePrescriptionField(index)}
//                   >
//                     <DeleteIcon fontSize="small" />
//                   </IconButton>
//                 </Box>

//                 <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//                   <TextField
//                     label="Medicine Name"
//                     value={p.medicineName}
//                     onChange={(e) => handlePrescriptionChange(index, "medicineName", e.target.value)}
//                     error={!!errors[`medicineName_${index}`]}
//                     helperText={errors[`medicineName_${index}`]}
//                     fullWidth
//                     size="small"
//                     required
//                     placeholder="e.g., Paracetamol"
//                   />
//                   <Box sx={{ display: "flex", gap: 2 }}>
//                     <TextField
//                       label="Dosage"
//                       value={p.dosage}
//                       onChange={(e) => handlePrescriptionChange(index, "dosage", e.target.value)}
//                       error={!!errors[`dosage_${index}`]}
//                       helperText={errors[`dosage_${index}`]}
//                       fullWidth
//                       size="small"
//                       required
//                       placeholder="e.g., 500mg"
//                     />
//                     <TextField
//                       label="Frequency"
//                       value={p.frequency}
//                       onChange={(e) => handlePrescriptionChange(index, "frequency", e.target.value)}
//                       error={!!errors[`frequency_${index}`]}
//                       helperText={errors[`frequency_${index}`]}
//                       fullWidth
//                       size="small"
//                       required
//                       placeholder="e.g., 3 times a day"
//                     />
//                     <TextField
//                       label="Duration"
//                       value={p.duration}
//                       onChange={(e) => handlePrescriptionChange(index, "duration", e.target.value)}
//                       error={!!errors[`duration_${index}`]}
//                       helperText={errors[`duration_${index}`]}
//                       fullWidth
//                       size="small"
//                       required
//                       placeholder="e.g., 5 days"
//                     />
//                   </Box>
//                 </Box>
//               </Box>
//             ))}

//             <Button
//               onClick={addPrescriptionField}
//               variant="outlined"
//               startIcon={<AddIcon />}
//               sx={{ alignSelf: "flex-start" }}
//             >
//               Add Medicine
//             </Button>

//             <Divider sx={{ my: 1 }} />

//             {/* Dues Field */}
//             <TextField
//               label="Dues Amount"
//               type="number"
//               name="dues"
//               value={newVisit.dues}
//               onChange={handleChange}
//               error={!!errors.dues}
//               helperText={errors.dues}
//               fullWidth
//               required
//               placeholder="Enter amount (e.g., 1500)"
//               inputProps={{ min: 0, step: "0.01" }}
//             />

//             {/* Modal Actions */}
//             <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
//               <Button onClick={resetModal} variant="outlined" color="secondary">
//                 Cancel
//               </Button>
//               <Button
//                 variant="contained"
//                 sx={{ background: "#B22222", "&:hover": { background: "#8B0000" } }}
//                 onClick={editingVisitId ? handleUpdateVisit : handleAddVisit}
//               >
//                 {editingVisitId ? "Update Visit" : "Add Visit"}
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//       </Modal>

//       {/* 🔹 Visits List */}
//       {visits.length === 0 ? (
//         <Card sx={{ p: 3, textAlign: "center" }}>
//           <Typography color="text.secondary">No visits found for this record</Typography>
//         </Card>
//       ) : (
//         visits.map((visit) => (
//           <Accordion key={visit._id} sx={{ mb: 2, borderRadius: 2 }}>
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Typography fontWeight="bold">
//                 📅 {formatDate(visit.visitDate)} - {formatTime(visit.visitTime)}
//               </Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <Typography><b>Date:</b> {formatDate(visit.visitDate)}</Typography>
//                   <Typography><b>Time:</b> {formatTime(visit.visitTime)}</Typography>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Typography><b>Dues:</b> Rs. {visit.dues}</Typography>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography><b>Reason:</b> {visit.reason}</Typography>
//                 </Grid>
//               </Grid>

//               <Typography fontWeight="bold" sx={{ mt: 3, mb: 1 }}>
//                 Prescriptions:
//               </Typography>

//               {visit.prescriptions?.length > 0 ? (
//                 <TableContainer component={Card} sx={{ borderRadius: 2, boxShadow: 2 }}>
//                   <Table size="small">
//                     <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//                       <TableRow>
//                         <TableCell align="center"><b>Medicine</b></TableCell>
//                         <TableCell align="center"><b>Dosage</b></TableCell>
//                         <TableCell align="center"><b>Frequency</b></TableCell>
//                         <TableCell align="center"><b>Duration</b></TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {visit.prescriptions.map((p, i) => (
//                         <TableRow key={i}>
//                           <TableCell align="center">{p.medicineName}</TableCell>
//                           <TableCell align="center">{p.dosage}</TableCell>
//                           <TableCell align="center">{p.frequency}</TableCell>
//                           <TableCell align="center">{p.duration}</TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               ) : (
//                 <Typography color="text.secondary" sx={{ ml: 1, fontStyle: "italic" }}>
//                   No prescriptions added.
//                 </Typography>
//               )}

//               <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
//                 <Button
//                   startIcon={<EditIcon />}
//                   color="primary"
//                   variant="outlined"
//                   size="small"
//                   onClick={() => handleEditVisit(visit)}
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   startIcon={<DeleteIcon />}
//                   color="error"
//                   variant="outlined"
//                   size="small"
//                   onClick={() => handleDeleteVisit(visit._id)}
//                 >
//                   Delete
//                 </Button>
//               </Box>
//             </AccordionDetails>
//           </Accordion>
//         ))
//       )}
//     </Box>
//   );
// };

// export default RecordDetailPage;
