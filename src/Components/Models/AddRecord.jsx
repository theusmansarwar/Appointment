
import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios"; // ✅ add axios
import { updateRecord } from "../../DAL/edit";
import { createRecord } from "../../DAL/create";
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

  useEffect(() => {
    console.log("incomig model data",Modeldata)
    if (Modeldata) {
      setPatientName(Modeldata.patientName || "");
    //    setAppointmentDate(
    //   Modeldata.appointmentDate
    //     ? new Date(Modeldata.appointmentDate).toISOString().split("T")[0]
    //     : ""
    // );
setAppointmentDate(formatDate(Modeldata.appointmentDate, "form"));

      setAppointmentTime(Modeldata.appointmentTime || "");
      setReason(Modeldata.reason || "");
      setPrescription(Modeldata.prescription || "");
      setDues(Modeldata.dues || "");
    } else {
      // clear fields for Add
      setPatientName("");
      setAppointmentDate("");
      setAppointmentTime("");
      setReason("");
      setPrescription("");
      setDues("");
    }
  }, [Modeldata]);

  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{

    const payload = {
      patientName,
      appointmentDate: appointmentDate ? new Date(appointmentDate) : null,
      appointmentTime,
      reason,
      prescription,
      dues,
    };

   
         if (Modeltype === "Add") {
           // 🔹 Call DAL createPatient
           const res = await createRecord(payload);
   if(res.status==200){

   }
   else if(res.missingFields){
    onResponse({
             messageType: "error",
             message: res?.message || "Record added",
             data: res?.data || payload,
           });

   }
           onResponse({
             messageType: "success",
             message: res?.message || "Record added",
             data: res?.data || payload,
           });
          }
        //  } else {
        //    // 🔹 Call DAL updatePatient (pass id from Modeldata)
        //    const res = await updateRecord(Modeldata._id, payload);
   
        //    onResponse({
        //      messageType: "success",
        //      message: res?.message || "Record updated",
        //      data: res?.data || payload,
        //    });
        //  }
         setOpen(false);
       } catch (err) {
         console.error(err);
         onResponse({
           messageType: "error",
           message: "Error saving Record",
         });
       }
     };
   
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          {Modeltype} Record
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
          label=" Appointment Date"
          InputLabelProps={{ shrink: true }}
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          type="time"
          label="Appointment Time"
          InputLabelProps={{ shrink: true }}
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Reason "
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Prescription"
          value={prescription}
          onChange={(e) => setPrescription(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          type="number"
          label="Dues"
          value={dues}
          onChange={(e) => setDues(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            onClick={handleClose}
            sx={{ background: "#B1B1B1" }}
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            
            variant="contained"
            sx={{ background: "#B22222" }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

