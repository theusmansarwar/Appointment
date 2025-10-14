import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import {  updatePatient } from "../../DAL/edit"; // 🔹 Import here
import { createPatient } from "../../DAL/create";
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

  useEffect(() => {
    if (Modeldata) {
      setName(Modeldata.name || "");
      setAge(Modeldata.age || "");
      setGender(Modeldata.gender || "Male");
      setPhone(Modeldata.phone || "");
      setAddress(Modeldata.address || "");
       setAppointmentDate(formatDate(
      Modeldata.appointmentDate,  "form" ));
      setAppointmentTime(Modeldata.appointmentTime || "");
      setReason(Modeldata.reason || "");
    } else {
      // Reset if Add
      setName("");
      setAge("");
      setGender("Male");
      setPhone("");
      setAddress("");
      setAppointmentDate("");
      setAppointmentTime("");
      setReason("");
    }
  }, [Modeldata]);

  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
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
      if (Modeltype === "Add") {
        // 🔹 Call DAL createPatient
        const res = await createPatient(payload);
         if(res.status==200){

   }
   else if(res.missingFields){
        onResponse({
          messageType: "success",
          message: res?.message || "Patient added",
          data: res?.data || payload,
        });
      }
      
           onResponse({
             messageType: "success",
             message: res?.message || "Patient added",
             data: res?.data || payload,
           });
         }  else {
        // 🔹 Call DAL updatePatient (pass id from Modeldata)
        const res = await updatePatient(Modeldata._id, payload);
         
        onResponse({
          messageType: "success",
          message: res?.message || "Patient updated",
          data: res?.data || payload,
        });
      }
      setOpen(false);
    } catch (err) {
      console.error(err);
      onResponse({
        messageType: "error",
        message: "Error saving patient",
      });
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          {Modeltype} Patient
        </Typography>

        {/* Form Fields */}
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="number"
          label="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          select
          label="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          sx={{ mb: 2 }}
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
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="date"
          label="Appointment Date"
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
          label="Reason for visit"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Buttons */}
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
