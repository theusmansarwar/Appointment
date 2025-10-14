
import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { createReport } from "../../DAL/create";
import { updateReport } from "../../DAL/edit";
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

export default function AddReport({
  open,
  setOpen,
  Modeltype,
  Modeldata,
  onResponse,
}) {
  const [reportDate, setReportDate] = useState("");
  const [totalAppointments, setTotalAppointments] = useState("");
  const [patientsSeen, setPatientsSeen] = useState("");
  const [cancelled, setCancelled] = useState("");
  const [noShow, setNoShow] = useState("");
  const [totalRevenue, setTotalRevenue] = useState("");
  const [prescriptionsGiven, setPrescriptionsGiven] = useState("");
  const [commonDiseases, setCommonDiseases] = useState("");

  useEffect(() => {
    if (Modeldata) {
       setReportDate(formatDate(Modeldata.reportDate , "form"));
    //    setReportDate(
    //   Modeldata.reportDate
    //     ? new Date(Modeldata.reportDate).toISOString().split("T")[0]
    //     : ""
    // );
   
      setTotalAppointments(Modeldata.totalAppointments || "");
      setPatientsSeen(Modeldata.patientsSeen || "");
      setCancelled(Modeldata.cancelled || "");
      setNoShow(Modeldata.noShow || "");
      setTotalRevenue(Modeldata.totalRevenue || "");
      setPrescriptionsGiven(Modeldata.prescriptionsGiven || "");
      setCommonDiseases((Modeldata.commonDiseases || []).join(", "));
    }
  }, [Modeldata]);

  const handleClose = () => setOpen(false);

  // ✅ make handleSubmit async
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      reportDate: reportDate ? new Date(reportDate) : null,
      totalAppointments,
      patientsSeen,
      cancelled,
      noShow,
      totalRevenue,
      prescriptionsGiven,
      commonDiseases: commonDiseases.split(",").map((d) => d.trim()),
    };

    try {
      if (Modeltype === "Add") {
        // Call DAL createReport
        const res = await createReport(payload);
         if(res.status==200){

   }
   else if(res.missingFields){
        onResponse({
          messageType: "success",
          message: res?.message || "Report added",
          data: res?.data || payload,
        });
      }
      
        onResponse({
          messageType: "success",
          message: res?.message || "Report added",
          data: res?.data || payload,
        });
      } else {
        // Call DAL updateReport
        const res = await updateReport(Modeldata._id, payload);
        onResponse({
          messageType: "success",
          message: res?.message || "Report updated",
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
          {Modeltype} Report
        </Typography>

        <TextField
          fullWidth
          type="date"
          label="Report Date"
          value={reportDate}
          onChange={(e) => setReportDate(e.target.value)}
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          type="number"
          label="Total Appointments"
          value={totalAppointments}
          onChange={(e) => setTotalAppointments(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="number"
          label="Patients Seen"
          value={patientsSeen}
          onChange={(e) => setPatientsSeen(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="number"
          label="Cancelled"
          value={cancelled}
          onChange={(e) => setCancelled(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="number"
          label="No-Show"
          value={noShow}
          onChange={(e) => setNoShow(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="number"
          label="Revenue (PKR)"
          value={totalRevenue}
          onChange={(e) => setTotalRevenue(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="number"
          label="Prescriptions Given"
          value={prescriptionsGiven}
          onChange={(e) => setPrescriptionsGiven(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Common Diseases (comma separated)"
          value={commonDiseases}
          onChange={(e) => setCommonDiseases(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button onClick={handleClose} sx={{ background: "#B1B1B1" }} variant="contained">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
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
