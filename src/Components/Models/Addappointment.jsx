// src/Components/Models/AddAppointment.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function AddAppointment({ open, setOpen, Modeltype, Modeldata, onResponse }) {
  const [patientName, setPatientName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [status, setStatus] = useState("Pending");
  const [reason, setReason] = useState("");
  
  

  useEffect(() => {
    if (Modeldata) {
      setPatientName(Modeldata.patientName || "");
       setAppointmentDate(
      Modeldata.appointmentDate
        ? new Date(Modeldata.appointmentDate).toISOString().split("T")[0]
        : ""
    );
      setAppointmentTime(Modeldata.appointmentTime || "");
      setStatus(Modeldata.status || "Pending");
      setReason(Modeldata.reason || "");
     
      
    }
  }, [Modeldata]);

  const handleClose = () => setOpen(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const payload = {
      patientName,
      appointmentDate: appointmentDate ? new Date(appointmentDate) : null,
      appointmentTime,
      status,
      reason,
     
     
    };

    try {
          if (Modeltype === "Add") {
            // Call DAL createReport
            const res = await createAppointment(payload);
             if(res.status==200){

   }
   else if(res.missingFields){
        onResponse({
          messageType: "success",
          message: res?.message || "Appointment added",
          data: res?.data || payload,
        });
      }
      
            onResponse({
              messageType: "success",
              message: res?.message || "Appointment added",
              data: res?.data || payload,
            });
          } else {
            // Call DAL updateReport
            const res = await updateAppointment(Modeldata._id, payload);
            onResponse({
              messageType: "success",
              message: res?.message || "Appointment updated",
              data: res?.data || payload,
            });
          }
          setOpen(false);
        } catch (err) {
          console.error(err);
          onResponse({
            messageType: "error",
            message: "Error saving report",
          });
        }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          {Modeltype} Appointment
        </Typography>

        <TextField
          fullWidth
          label="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="date"
          label="Date"
          InputLabelProps={{ shrink: true }}
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="time"
          label="Time"
          InputLabelProps={{ shrink: true }}
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
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
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          sx={{ mb: 2 }}
        />
      

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button onClick={handleClose} sx={{ background: "#B1B1B1" }} variant="contained">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ background: "var(--primary-color)" }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
