
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { fetchRecordById, fetchRecordVisits } from "../../DAL/fetch";
import { deleteRecordVisit } from "../../DAL/delete";
import { createRecordVisit } from "../../DAL/create";
import { updateRecordVisit } from "../../DAL/edit"; // ✅ Import update API

const RecordDetailPage = () => {
  const { recordId } = useParams();
  const [record, setRecord] = useState(null);
  const [visits, setVisits] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingVisitId, setEditingVisitId] = useState(null);

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
    }
  };

  const loadVisits = async () => {
    try {
      const res = await fetchRecordVisits(recordId);
      setVisits(res?.visits || []);
    } catch (err) {
      console.error("Error fetching visits:", err);
    }
  };

  useEffect(() => {
    if (recordId) {
      loadRecord();
      loadVisits();
    }
  }, [recordId]);

  // Handle field changes
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

  const handleAddVisit = async () => {
    try {
      await createRecordVisit(recordId, newVisit);
      resetModal();
      loadVisits();
    } catch (err) {
      console.error("Error adding visit:", err);
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
    setOpenModal(true);
  };

  const handleUpdateVisit = async () => {
    try {
      await updateRecordVisit(recordId, editingVisitId, newVisit);
      resetModal();
      loadVisits();
    } catch (err) {
      console.error("Error updating visit:", err);
    }
  };

  const handleDeleteVisit = async (visitId) => {
    try {
      await deleteRecordVisit(recordId, visitId);
      loadVisits();
    } catch (err) {
      console.error("Error deleting visit:", err);
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
    setOpenModal(false);
    setEditingVisitId(null);
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Record Info */}
      {record && (
        <Card sx={{ mb: 4, p: 2, boxShadow: 3, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h5"sx={{ color: "var(--primary-color)" }}>
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
          }}
        >
          <Typography variant="h6" gutterBottom>
            {editingVisitId ? "Edit Visit" : "Add New Visit"}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Date" type="date" name="visitDate" value={newVisit.visitDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            <TextField label="Time" type="time" name="visitTime" value={newVisit.visitTime} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            <TextField label="Reason" name="reason" value={newVisit.reason} onChange={handleChange} />

            <Typography variant="subtitle1" fontWeight="bold">Prescriptions</Typography>
            {newVisit.prescriptions.map((p, index) => (
              <Box key={index} sx={{ display: "flex", gap: 2 }}>
                <TextField label="Medicine" value={p.medicineName} onChange={(e) => handlePrescriptionChange(index, "medicineName", e.target.value)} />
                <TextField label="Dosage" value={p.dosage} onChange={(e) => handlePrescriptionChange(index, "dosage", e.target.value)} />
                <TextField label="Frequency" value={p.frequency} onChange={(e) => handlePrescriptionChange(index, "frequency", e.target.value)} />
                <TextField label="Duration" value={p.duration} onChange={(e) => handlePrescriptionChange(index, "duration", e.target.value)} />
              </Box>
            ))}
            <Button onClick={addPrescriptionField}>+ Add Medicine</Button>

            <TextField label="Dues" type="number" name="dues" value={newVisit.dues} onChange={handleChange} />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button onClick={resetModal} variant="outlined" color="secondary">Cancel</Button>
              <Button variant="contained" sx={{ background: "#B22222" }} onClick={editingVisitId ? handleUpdateVisit : handleAddVisit}>
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
                <Button startIcon={<EditIcon />} color="primary" variant="outlined" size="small" onClick={() => handleEditVisit(visit)}>
                  Edit
                </Button>
                <Button startIcon={<DeleteIcon />} color="error" variant="outlined" size="small" onClick={() => handleDeleteVisit(visit._id)}>
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
