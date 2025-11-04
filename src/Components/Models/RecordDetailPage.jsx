
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
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

// const RecordDetailPage = () => {
//   const { recordId } = useParams();
//   const [record, setRecord] = useState(null);
//   const [visits, setVisits] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [editingVisitId, setEditingVisitId] = useState(null);

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
// import { useParams } from "react-router-dom";
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
//   FormHelperText,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import AddIcon from "@mui/icons-material/Add";
// import { fetchRecordById, fetchRecordVisits } from "../../DAL/fetch";
// import { deleteRecordVisit } from "../../DAL/delete";
// import { createRecordVisit } from "../../DAL/create";
// import { updateRecordVisit } from "../../DAL/edit";

// const RecordDetailPage = () => {
//   const { recordId } = useParams();
//   const [record, setRecord] = useState(null);
//   const [visits, setVisits] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [editingVisitId, setEditingVisitId] = useState(null);
//   const [errors, setErrors] = useState({});

//   const [newVisit, setNewVisit] = useState({
//     visitDate: "",
//     visitTime: "",
//     reason: "",
//     dues: "",
//     prescriptions: [],
//   });

//   // 🔹 Fetch record and visits
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

//   // 🔹 Field handlers
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

//   // 🔹 Validation
//   const validateVisit = () => {
//     const newErrors = {};
//     if (!newVisit.visitDate)
//       newErrors.visitDate = "Visit date is required.";
//     if (!newVisit.visitTime)
//       newErrors.visitTime = "Visit time is required.";
//     if (!newVisit.reason.trim())
//       newErrors.reason = "Reason is required.";
//     if (!newVisit.dues || isNaN(newVisit.dues) || Number(newVisit.dues) < 0)
//       newErrors.dues = "Valid dues amount is required.";

//     newVisit.prescriptions.forEach((p, i) => {
//       if (!p.medicineName.trim())
//         newErrors[`medicineName_${i}`] = "Medicine name is required.";
//       if (!p.dosage.trim())
//         newErrors[`dosage_${i}`] = "Dosage is required.";
//       if (!p.frequency.trim())
//         newErrors[`frequency_${i}`] = "Frequency is required.";
//       if (!p.duration.trim())
//         newErrors[`duration_${i}`] = "Duration is required.";
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // 🔹 Add Visit
//   const handleAddVisit = async () => {
//     if (!validateVisit()) return;

//     try {
//       const response = await createRecordVisit(recordId, newVisit);
//       if (response?.status === 200 || response?.status === 201) {
//         resetModal();
//         loadVisits();
//       } else if (response?.status === 400 && response?.missingFields) {
//         const backendErrors = {};
//         response.missingFields.forEach((f) => {
//           backendErrors[f.name] = f.message;
//         });
//         setErrors(backendErrors);
//       }
//     } catch (err) {
//       console.error("Error adding visit:", err);
//     }
//   };

//   // 🔹 Edit Visit
//   const handleEditVisit = (visit) => {
//     setEditingVisitId(visit._id);
//     setNewVisit({
//       visitDate: visit.visitDate?.split("T")[0],
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
//     if (!validateVisit()) return;

//     try {
//       const response = await updateRecordVisit(recordId, editingVisitId, newVisit);
//       if (response?.status === 200 || response?.status === 201) {
//         resetModal();
//         loadVisits();
//       } else if (response?.status === 400 && response?.missingFields) {
//         const backendErrors = {};
//         response.missingFields.forEach((f) => {
//           backendErrors[f.name] = f.message;
//         });
//         setErrors(backendErrors);
//       }
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
//     setErrors({});
//     setEditingVisitId(null);
//     setOpenModal(false);
//   };

//   return (
//     <Box sx={{ padding: 3 }}>
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

//       {/* 🔹 Visits Header */}
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
//             width: "55%",
//           }}
//         >
//           <Typography variant="h6" gutterBottom>
//             {editingVisitId ? "Edit Visit" : "Add New Visit"}
//           </Typography>
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//             <TextField
//               label="Date"
//               type="date"
//               name="visitDate"
//               value={newVisit.visitDate}
//               onChange={handleChange}
//               InputLabelProps={{ shrink: true }}
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
//               error={!!errors.visitTime}
//               helperText={errors.visitTime}
//             />
//             <TextField
//               label="Reason"
//               name="reason"
//               value={newVisit.reason}
//               onChange={handleChange}
//               error={!!errors.reason}
//               helperText={errors.reason}
//             />

//             {/* 🔹 Prescriptions Section */}
//             <Typography variant="subtitle1" fontWeight="bold">Prescriptions</Typography>
//             {newVisit.prescriptions.map((p, index) => (
//               <Box key={index} sx={{ display: "flex", gap: 2 }}>
//                 <TextField
//                   label="Medicine"
//                   value={p.medicineName}
//                   onChange={(e) => handlePrescriptionChange(index, "medicineName", e.target.value)}
//                   error={!!errors[`medicineName_${index}`]}
//                   helperText={errors[`medicineName_${index}`]}
//                 />
//                 <TextField
//                   label="Dosage"
//                   value={p.dosage}
//                   onChange={(e) => handlePrescriptionChange(index, "dosage", e.target.value)}
//                   error={!!errors[`dosage_${index}`]}
//                   helperText={errors[`dosage_${index}`]}
//                 />
//                 <TextField
//                   label="Frequency"
//                   value={p.frequency}
//                   onChange={(e) => handlePrescriptionChange(index, "frequency", e.target.value)}
//                   error={!!errors[`frequency_${index}`]}
//                   helperText={errors[`frequency_${index}`]}
//                 />
//                 <TextField
//                   label="Duration"
//                   value={p.duration}
//                   onChange={(e) => handlePrescriptionChange(index, "duration", e.target.value)}
//                   error={!!errors[`duration_${index}`]}
//                   helperText={errors[`duration_${index}`]}
//                 />
//               </Box>
//             ))}
//             <Button onClick={addPrescriptionField}>+ Add Medicine</Button>

//             <TextField
//               label="Dues"
//               type="number"
//               name="dues"
//               value={newVisit.dues}
//               onChange={handleChange}
//               error={!!errors.dues}
//               helperText={errors.dues}
//             />

//             {/* 🔹 Modal Actions */}
//             <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
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

//       {/* 🔹 Visits List */}
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
//   IconButton,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import AddIcon from "@mui/icons-material/Add";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { fetchRecordById, fetchRecordVisits } from "../../DAL/fetch";
// import { deleteRecordVisit } from "../../DAL/delete";
// import { createRecordVisit } from "../../DAL/create";
// import { updateRecordVisit } from "../../DAL/edit";

// const RecordDetailPage = () => {
//   const { recordId } = useParams();
//   const navigate = useNavigate();

//   const [record, setRecord] = useState(null);
//   const [visits, setVisits] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [editingVisitId, setEditingVisitId] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [newVisit, setNewVisit] = useState({
//     visitDate: "",
//     visitTime: "",
//     reason: "",
//     dues: "",
//     prescriptions: [],
//   });

//   // ✅ Snackbar State
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   // 🔹 Fetch record and visits
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

//   // 🔹 Field handlers
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

//   // 🔹 Validation
//   const validateVisit = () => {
//     const newErrors = {};
//     if (!newVisit.visitDate) newErrors.visitDate = "Visit date is required.";
//     if (!newVisit.visitTime) newErrors.visitTime = "Visit time is required.";
//     if (!newVisit.reason.trim()) newErrors.reason = "Reason is required.";
//     if (!newVisit.dues || isNaN(newVisit.dues) || Number(newVisit.dues) < 0)
//       newErrors.dues = "Valid dues amount is required.";

//     newVisit.prescriptions.forEach((p, i) => {
//       if (!p.medicineName.trim())
//         newErrors[`medicineName_${i}`] = "Medicine name is required.";
//       if (!p.dosage.trim()) newErrors[`dosage_${i}`] = "Dosage is required.";
//       if (!p.frequency.trim())
//         newErrors[`frequency_${i}`] = "Frequency is required.";
//       if (!p.duration.trim())
//         newErrors[`duration_${i}`] = "Duration is required.";
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // 🔹 Add Visit
//   const handleAddVisit = async () => {
//     if (!validateVisit()) return;

//     try {
//       const response = await createRecordVisit(recordId, newVisit);
//       if (response?.status === 200 || response?.status === 201) {
//         await loadVisits();
//         setSnackbar({
//           open: true,
//           message: "✅ Visit added successfully!",
//           severity: "success",
//         });
//         resetModal(); // ✅ Close popup
//       } else if (response?.status === 400 && response?.missingFields) {
//         const backendErrors = {};
//         response.missingFields.forEach((f) => {
//           backendErrors[f.name] = f.message;
//         });
//         setErrors(backendErrors);
//       }
//     } catch (err) {
//       console.error("Error adding visit:", err);
//       setSnackbar({
//         open: true,
//         message: "❌ Error adding visit",
//         severity: "error",
//       });
//     }
//     setOpenModal(false);
//   };

//   // 🔹 Edit Visit
//   const handleEditVisit = (visit) => {
//     setEditingVisitId(visit._id);
//     setNewVisit({
//       visitDate: visit.visitDate?.split("T")[0],
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
//     if (!validateVisit()) return;

//     try {
//       const response = await updateRecordVisit(recordId, editingVisitId, newVisit);
//       if (response?.status === 200 || response?.status === 201) {
//         await loadVisits();
//         setSnackbar({
//           open: true,
//           message: "📝 Visit updated successfully!",
//           severity: "success",
//         });
//         resetModal(); // ✅ Close popup
//       } else if (response?.status === 400 && response?.missingFields) {
//         const backendErrors = {};
//         response.missingFields.forEach((f) => {
//           backendErrors[f.name] = f.message;
//         });
//         setErrors(backendErrors);
//       }
//     } catch (err) {
//       console.error("Error updating visit:", err);
//       setSnackbar({
//         open: true,
//         message: "❌ Error updating visit",
//         severity: "error",
//       });
//     }
//     setOpenModal(false);
//   };

//   // 🔹 Delete Visit
//   const handleDeleteVisit = async (visitId) => {
//     try {
//       await deleteRecordVisit(recordId, visitId);
//       await loadVisits();
//       setSnackbar({
//         open: true,
//         message: "🗑️ Visit deleted successfully!",
//         severity: "info",
//       });
//     } catch (err) {
//       console.error("Error deleting visit:", err);
//       setSnackbar({
//         open: true,
//         message: "❌ Error deleting visit",
//         severity: "error",
//       });
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
//     setEditingVisitId(null);
//     setOpenModal(false);
//   };

//   return (
//     <Box sx={{ padding: 3 }}>
//       {/* 🔙 Back Arrow */}
//       <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//         <IconButton color="primary" onClick={() => navigate("/records")}>
//           <ArrowBackIcon />
//         </IconButton>
//         <Typography variant="h5" sx={{ ml: 1, color: "var(--primary-color)" }}>
//           Record Details
//         </Typography>
//       </Box>

//       {/* 🔹 Record Info */}
//       {record && (
//         <Card sx={{ mb: 4, p: 2, boxShadow: 3, borderRadius: 3 }}>
//           <CardContent>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <Typography>
//                   <b>Patient Name:</b> {record.patientName}
//                 </Typography>
//                 <Typography>
//                   <b>Appointment Date:</b>{" "}
//                   {new Date(record.appointmentDate).toLocaleDateString()}
//                 </Typography>
//                 <Typography>
//                   <b>Appointment Time:</b> {record.appointmentTime}
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography>
//                   <b>Reason:</b> {record.reason}
//                 </Typography>
//                 <Typography>
//                   <b>Prescription:</b> {record.prescription}
//                 </Typography>
//                 <Typography>
//                   <b>Dues:</b> {record.dues}
//                 </Typography>
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
//           sx={{ background: "#B22222" }}
//           onClick={() => setOpenModal(true)}
//         >
//           Add Visit
//         </Button>
//       </Box>

//       {/* 🔹 Modal */}
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
//             <TextField
//               label="Date"
//               type="date"
//               name="visitDate"
//               value={newVisit.visitDate}
//               onChange={handleChange}
//               InputLabelProps={{ shrink: true }}
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
//               error={!!errors.visitTime}
//               helperText={errors.visitTime}
//             />
//             <TextField
//               label="Reason"
//               name="reason"
//               value={newVisit.reason}
//               onChange={handleChange}
//               error={!!errors.reason}
//               helperText={errors.reason}
//             />

//             {/* 🔹 Prescriptions */}
//             <Typography variant="subtitle1" fontWeight="bold">
//               Prescriptions
//             </Typography>
//             {newVisit.prescriptions.map((p, index) => (
//               <Box key={index} sx={{ display: "flex", gap: 2 }}>
//                 <TextField
//                   label="Medicine"
//                   value={p.medicineName}
//                   onChange={(e) =>
//                     handlePrescriptionChange(index, "medicineName", e.target.value)
//                   }
//                   error={!!errors[`medicineName_${index}`]}
//                   helperText={errors[`medicineName_${index}`]}
//                 />
//                 <TextField
//                   label="Dosage"
//                   value={p.dosage}
//                   onChange={(e) =>
//                     handlePrescriptionChange(index, "dosage", e.target.value)
//                   }
//                   error={!!errors[`dosage_${index}`]}
//                   helperText={errors[`dosage_${index}`]}
//                 />
//                 <TextField
//                   label="Frequency"
//                   value={p.frequency}
//                   onChange={(e) =>
//                     handlePrescriptionChange(index, "frequency", e.target.value)
//                   }
//                   error={!!errors[`frequency_${index}`]}
//                   helperText={errors[`frequency_${index}`]}
//                 />
//                 <TextField
//                   label="Duration"
//                   value={p.duration}
//                   onChange={(e) =>
//                     handlePrescriptionChange(index, "duration", e.target.value)
//                   }
//                   error={!!errors[`duration_${index}`]}
//                   helperText={errors[`duration_${index}`]}
//                 />
//               </Box>
//             ))}
//             <Button onClick={addPrescriptionField}>+ Add Medicine</Button>

//             <TextField
//               label="Dues"
//               type="number"
//               name="dues"
//               value={newVisit.dues}
//               onChange={handleChange}
//               error={!!errors.dues}
//               helperText={errors.dues}
//             />

//             {/* 🔹 Modal Actions */}
//             <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
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

//       {/* 🔹 Visits List */}
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
//               <Typography>
//                 <b>Time:</b> {visit.visitTime}
//               </Typography>
//               <Typography>
//                 <b>Reason:</b> {visit.reason}
//               </Typography>
//               <Typography>
//                 <b>Dues:</b> {visit.dues}
//               </Typography>

//               <Typography fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
//                 Prescriptions:
//               </Typography>

//               {visit.prescriptions?.length > 0 ? (
//                 <TableContainer component={Card} sx={{ borderRadius: 2, boxShadow: 2 }}>
//                   <Table size="small">
//                     <TableHead>
//                       <TableRow>
//                         <TableCell align="center">
//                           <b>Medicine</b>
//                         </TableCell>
//                         <TableCell align="center">
//                           <b>Dosage</b>
//                         </TableCell>
//                         <TableCell align="center">
//                           <b>Frequency</b>
//                         </TableCell>
//                         <TableCell align="center">
//                           <b>Duration</b>
//                         </TableCell>
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

//       {/* ✅ Snackbar for success/error */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           severity={snackbar.severity}
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
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
  Grid,
  Modal,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { fetchRecordById, fetchRecordVisits } from "../../DAL/fetch";
import { deleteRecordVisit } from "../../DAL/delete";
import { createRecordVisit } from "../../DAL/create";
import { updateRecordVisit } from "../../DAL/edit";

import { useAlert } from "../../Components/Alert/AlertContext"; // ✅ Import global alert

const RecordDetailPage = () => {
  const { recordId } = useParams();
  const navigate = useNavigate();
  const { showAlert } = useAlert(); // ✅ use global alert

  const [record, setRecord] = useState(null);
  const [visits, setVisits] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingVisitId, setEditingVisitId] = useState(null);
  const [errors, setErrors] = useState({});
  const [newVisit, setNewVisit] = useState({
    visitDate: "",
    visitTime: "",
    reason: "",
    dues: "",
    prescriptions: [],
  });

  // 🔹 Load record and visits
  const loadRecord = async () => {
    try {
      const res = await fetchRecordById(recordId);
      setRecord(res);
    } catch (err) {
      console.error("Error fetching record:", err);
      showAlert("error", "❌ Failed to load record details");
    }
  };

  const loadVisits = async () => {
    try {
      const res = await fetchRecordVisits(recordId);
      setVisits(res?.visits || []);
    } catch (err) {
      console.error("Error fetching visits:", err);
      showAlert("error", "❌ Failed to load visits");
    }
  };

  useEffect(() => {
    if (recordId) {
      loadRecord();
      loadVisits();
    }
  }, [recordId]);

  // 🔹 Field handlers
  const handleChange = (e) => {
    setNewVisit({ ...newVisit, [e.target.name]: e.target.value });
  };

  const handlePrescriptionChange = (index, field, value) => {
    const updated = [...newVisit.prescriptions];
    updated[index][field] = value;
    setNewVisit({ ...newVisit, prescriptions: updated });
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

  // 🔹 Validation
  const validateVisit = () => {
    const newErrors = {};
    if (!newVisit.visitDate) newErrors.visitDate = "Visit date is required.";
    if (!newVisit.visitTime) newErrors.visitTime = "Visit time is required.";
    if (!newVisit.reason.trim()) newErrors.reason = "Reason is required.";
    if (!newVisit.dues || isNaN(newVisit.dues) || Number(newVisit.dues) < 0)
      newErrors.dues = "Valid dues amount is required.";

    newVisit.prescriptions.forEach((p, i) => {
      if (!p.medicineName.trim())
        newErrors[`medicineName_${i}`] = "Medicine name is required.";
      if (!p.dosage.trim()) newErrors[`dosage_${i}`] = "Dosage is required.";
      if (!p.frequency.trim())
        newErrors[`frequency_${i}`] = "Frequency is required.";
      if (!p.duration.trim())
        newErrors[`duration_${i}`] = "Duration is required.";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Add Visit
  const handleAddVisit = async () => {
    if (!validateVisit()) return;

    try {
      const response = await createRecordVisit(recordId, newVisit);
      if (response?.status === 200 || response?.status === 201) {
        await loadVisits();
        showAlert("success", "✅ Visit added successfully!");
        resetModal();
      } else {
        showAlert("error", "❌ Failed to add visit");
      }
    } catch (err) {
      console.error("Error adding visit:", err);
      showAlert("error", "❌ Error adding visit");
    }
    setOpenModal(false);
  };

  // 🔹 Edit Visit
  const handleEditVisit = (visit) => {
    setEditingVisitId(visit._id);
    setNewVisit({
      visitDate: visit.visitDate?.split("T")[0],
      visitTime: visit.visitTime || "",
      reason: visit.reason || "",
      dues: visit.dues || "",
      prescriptions: visit.prescriptions || [],
    });
    setErrors({});
    setOpenModal(true);
  };

  // 🔹 Update Visit
  const handleUpdateVisit = async () => {
    if (!validateVisit()) return;

    try {
      const response = await updateRecordVisit(recordId, editingVisitId, newVisit);
      if (response?.status === 200 || response?.status === 201) {
        await loadVisits();
        showAlert("success", "📝 Visit updated successfully!");
        resetModal();
      } else {
        showAlert("error", "❌ Failed to update visit");
      }
    } catch (err) {
      console.error("Error updating visit:", err);
      showAlert("error", "❌ Error updating visit");
    }
    setOpenModal(false);
  };

  // 🔹 Delete Visit
  const handleDeleteVisit = async (visitId) => {
    try {
      await deleteRecordVisit(recordId, visitId);
      await loadVisits();
      showAlert("info", "🗑️ Visit deleted successfully!");
    } catch (err) {
      console.error("Error deleting visit:", err);
      showAlert("error", "❌ Error deleting visit");
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
    setEditingVisitId(null);
    setOpenModal(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* 🔙 Back Arrow */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton color="primary" onClick={() => navigate("/records")}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ ml: 1, color: "var(--primary-color)" }}>
          Record Details
        </Typography>
      </Box>

      {/* Record Info */}
      {record && (
        <Card sx={{ mb: 4, p: 2, boxShadow: 3, borderRadius: 3 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography>
                  <b>Patient Name:</b> {record.patientName}
                </Typography>
                <Typography>
                  <b>Appointment Date:</b>{" "}
                  {new Date(record.appointmentDate).toLocaleDateString()}
                </Typography>
                <Typography>
                  <b>Appointment Time:</b> {record.appointmentTime}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  <b>Reason:</b> {record.reason}
                </Typography>
                <Typography>
                  <b>Prescription:</b> {record.prescription}
                </Typography>
                <Typography>
                  <b>Dues:</b> {record.dues}
                </Typography>
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

      {/* Visit Modal */}
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
          }}
        >
          <Typography variant="h6" gutterBottom>
            {editingVisitId ? "Edit Visit" : "Add New Visit"}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Date"
              type="date"
              name="visitDate"
              value={newVisit.visitDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
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
              error={!!errors.visitTime}
              helperText={errors.visitTime}
            />
            <TextField
              label="Reason"
              name="reason"
              value={newVisit.reason}
              onChange={handleChange}
              error={!!errors.reason}
              helperText={errors.reason}
            />

            {/* Prescriptions */}
            <Typography variant="subtitle1" fontWeight="bold">
              Prescriptions
            </Typography>
            {newVisit.prescriptions.map((p, index) => (
              <Box key={index} sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label="Medicine"
                  value={p.medicineName}
                  onChange={(e) =>
                    handlePrescriptionChange(index, "medicineName", e.target.value)
                  }
                  error={!!errors[`medicineName_${index}`]}
                  helperText={errors[`medicineName_${index}`]}
                />
                <TextField
                  label="Dosage"
                  value={p.dosage}
                  onChange={(e) =>
                    handlePrescriptionChange(index, "dosage", e.target.value)
                  }
                  error={!!errors[`dosage_${index}`]}
                  helperText={errors[`dosage_${index}`]}
                />
                <TextField
                  label="Frequency"
                  value={p.frequency}
                  onChange={(e) =>
                    handlePrescriptionChange(index, "frequency", e.target.value)
                  }
                  error={!!errors[`frequency_${index}`]}
                  helperText={errors[`frequency_${index}`]}
                />
                <TextField
                  label="Duration"
                  value={p.duration}
                  onChange={(e) =>
                    handlePrescriptionChange(index, "duration", e.target.value)
                  }
                  error={!!errors[`duration_${index}`]}
                  helperText={errors[`duration_${index}`]}
                />
              </Box>
            ))}
            <Button onClick={addPrescriptionField}>+ Add Medicine</Button>

            <TextField
              label="Dues"
              type="number"
              name="dues"
              value={newVisit.dues}
              onChange={handleChange}
              error={!!errors.dues}
              helperText={errors.dues}
            />

            {/* Modal Actions */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
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
              <Typography>
                <b>Time:</b> {visit.visitTime}
              </Typography>
              <Typography>
                <b>Reason:</b> {visit.reason}
              </Typography>
              <Typography>
                <b>Dues:</b> {visit.dues}
              </Typography>

              <Typography fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
                Prescriptions:
              </Typography>

              {visit.prescriptions?.length > 0 ? (
                <TableContainer component={Card} sx={{ borderRadius: 2, boxShadow: 2 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">
                          <b>Medicine</b>
                        </TableCell>
                        <TableCell align="center">
                          <b>Dosage</b>
                        </TableCell>
                        <TableCell align="center">
                          <b>Frequency</b>
                        </TableCell>
                        <TableCell align="center">
                          <b>Duration</b>
                        </TableCell>
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
