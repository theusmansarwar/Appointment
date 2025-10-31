
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

//   useEffect(() => {
//     if (Modeldata) {
//        setReportDate(formatDate(Modeldata.reportDate , "form"));
//     //    setReportDate(
//     //   Modeldata.reportDate
//     //     ? new Date(Modeldata.reportDate).toISOString().split("T")[0]
//     //     : ""
//     // );
   
//       setTotalAppointments(Modeldata.totalAppointments || "");
//       setPatientsSeen(Modeldata.patientsSeen || "");
//       setCancelled(Modeldata.cancelled || "");
//       setNoShow(Modeldata.noShow || "");
//       setTotalRevenue(Modeldata.totalRevenue || "");
//       setPrescriptionsGiven(Modeldata.prescriptionsGiven || "");
//       setCommonDiseases((Modeldata.commonDiseases || []).join(", "));
//     }
//   }, [Modeldata]);

//   const handleClose = () => setOpen(false);

//   // ✅ make handleSubmit async
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       reportDate: reportDate ? new Date(reportDate) : null,
//       totalAppointments,
//       patientsSeen,
//       cancelled,
//       noShow,
//       totalRevenue,
//       prescriptionsGiven,
//       commonDiseases: commonDiseases.split(",").map((d) => d.trim()),
//     };

//     try {
//       if (Modeltype === "Add") {
//         // Call DAL createReport
//         const res = await createReport(payload);
//          if(res.status==200){

//    }
//    else if(res.missingFields){
//         onResponse({
//           messageType: "success",
//           message: res?.message || "Report added",
//           data: res?.data || payload,
//         });
//       }
      
//         onResponse({
//           messageType: "success",
//           message: res?.message || "Report added",
//           data: res?.data || payload,
//         });
//       } else {
//         // Call DAL updateReport
//         const res = await updateReport(Modeldata._id, payload);
//         onResponse({
//           messageType: "success",
//           message: res?.message || "Report updated",
//           data: res?.data || payload,
//         });
//       }
//       setOpen(false);
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

//         <TextField
//           fullWidth
//           type="date"
//           label="Report Date"
//           value={reportDate}
//           onChange={(e) => setReportDate(e.target.value)}
//           sx={{ mb: 2 }}
//           InputLabelProps={{ shrink: true }}
//         />
//         <TextField
//           fullWidth
//           type="number"
//           label="Total Appointments"
//           value={totalAppointments}
//           onChange={(e) => setTotalAppointments(e.target.value)}
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           fullWidth
//           type="number"
//           label="Patients Seen"
//           value={patientsSeen}
//           onChange={(e) => setPatientsSeen(e.target.value)}
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           fullWidth
//           type="number"
//           label="Cancelled"
//           value={cancelled}
//           onChange={(e) => setCancelled(e.target.value)}
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           fullWidth
//           type="number"
//           label="No-Show"
//           value={noShow}
//           onChange={(e) => setNoShow(e.target.value)}
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           fullWidth
//           type="number"
//           label="Revenue (PKR)"
//           value={totalRevenue}
//           onChange={(e) => setTotalRevenue(e.target.value)}
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           fullWidth
//           type="number"
//           label="Prescriptions Given"
//           value={prescriptionsGiven}
//           onChange={(e) => setPrescriptionsGiven(e.target.value)}
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           fullWidth
//           label="Common Diseases (comma separated)"
//           value={commonDiseases}
//           onChange={(e) => setCommonDiseases(e.target.value)}
//           sx={{ mb: 2 }}
//         />

//         <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
//           <Button onClick={handleClose} sx={{ background: "#B1B1B1" }} variant="contained">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSubmit}
//             variant="contained"
//             sx={{ background: "#B22222" }}
//           >
//             Submit
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
//   Grid,
// } from "@mui/material";
// import { createReport } from "../../DAL/create";
// import { updateReport } from "../../DAL/edit";
// import { formatDate } from "../../Utils/Formatedate";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "70%",
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: "12px",
//   maxHeight: "90vh",
//   overflowY: "auto",
// };

// export default function AddReport({ open, setOpen, Modeltype, Modeldata, onResponse }) {
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
//     }
//   }, [Modeldata]);

//   const handleClose = () => setOpen(false);

//   const validateFields = () => {
//     const newErrors = {};
//     if (!reportDate) newErrors.reportDate = "Report date is required";
//     if (!totalAppointments) newErrors.totalAppointments = "Total appointments required";
//     if (!patientsSeen) newErrors.patientsSeen = "Patients seen required";
//     if (!cancelled) newErrors.cancelled = "Cancelled count required";
//     if (!noShow) newErrors.noShow = "No-show count required";
//     if (!totalRevenue) newErrors.totalRevenue = "Total revenue required";
//     if (!prescriptionsGiven) newErrors.prescriptionsGiven = "Prescriptions count required";
//      if (!commonDiseases) newErrors.commonDiseases = "common Diseases required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const clearForm = () => {
//     setReportDate("");
//     setTotalAppointments("");
//     setPatientsSeen("");
//     setCancelled("");
//     setNoShow("");
//     setTotalRevenue("");
//     setPrescriptionsGiven("");
//     setCommonDiseases("");
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
//       if (Modeltype === "Add") {
//         res = await createReport(payload);
//       } else {
//         res = await updateReport(Modeldata._id, payload);
//       }

//       if (res?.status === 200 || res?.message?.includes("success")) {
//         onResponse({
//           messageType: "success",
//           message: Modeltype === "Add" ? "Report added successfully" : "Report updated successfully",
//           data: res?.data || payload,
//         });
//         clearForm();
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
//           <Grid container spacing={2}>
//             {/* LEFT SIDE */}
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 type="date"
//                 label="Report Date"
//                 value={reportDate}
//                 onChange={(e) => setReportDate(e.target.value)}
//                 sx={{ mb: 2 }}
//                 InputLabelProps={{ shrink: true }}
//                 error={!!errors.reportDate}
//                 helperText={errors.reportDate}
//               />

//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Total Appointments"
//                 value={totalAppointments}
//                 onChange={(e) => setTotalAppointments(e.target.value)}
//                 sx={{ mb: 2 }}
//                 error={!!errors.totalAppointments}
//                 helperText={errors.totalAppointments}
//               />

//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Patients Seen"
//                 value={patientsSeen}
//                 onChange={(e) => setPatientsSeen(e.target.value)}
//                 sx={{ mb: 2 }}
//                 error={!!errors.patientsSeen}
//                 helperText={errors.patientsSeen}
//               />

//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Cancelled"
//                 value={cancelled}
//                 onChange={(e) => setCancelled(e.target.value)}
//                 sx={{ mb: 2 }}
//                 error={!!errors.cancelled}
//                 helperText={errors.cancelled}
//               />
//             </Grid>

//             {/* RIGHT SIDE */}
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="No-Show"
//                 value={noShow}
//                 onChange={(e) => setNoShow(e.target.value)}
//                 sx={{ mb: 2 }}
//                 error={!!errors.noShow}
//                 helperText={errors.noShow}
//               />

//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Revenue (PKR)"
//                 value={totalRevenue}
//                 onChange={(e) => setTotalRevenue(e.target.value)}
//                 sx={{ mb: 2 }}
//                 error={!!errors.totalRevenue}
//                 helperText={errors.totalRevenue}
//               />

//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Prescriptions Given"
//                 value={prescriptionsGiven}
//                 onChange={(e) => setPrescriptionsGiven(e.target.value)}
//                 sx={{ mb: 2 }}
//                 error={!!errors.prescriptionsGiven}
//                 helperText={errors.prescriptionsGiven}
//               />

//               <TextField
//                 fullWidth
//                 label="Common Diseases (comma separated)"
//                 value={commonDiseases}
//                 onChange={(e) => setCommonDiseases(e.target.value)}
//                 sx={{ mb: 2 }}
//                  error={!!errors.commonDiseases}
//                 helperText={errors.commonDiseases}
//               />
//             </Grid>
//           </Grid>

//           {/* BUTTONS */}
//           <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
//             <Button
//               onClick={handleClose}
//               sx={{ background: "#B1B1B1" }}
//               variant="contained"
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               variant="contained"
//               sx={{ background: "#B22222" }}
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
  Grid,
} from "@mui/material";
import { createReport } from "../../DAL/create";
import { updateReport } from "../../DAL/edit";
import { formatDate } from "../../Utils/Formatedate";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
  maxHeight: "90vh",
  overflowY: "auto",
};

export default function AddReport({ open, setOpen, Modeltype, Modeldata, onResponse }) {
  const [reportDate, setReportDate] = useState("");
  const [totalAppointments, setTotalAppointments] = useState("");
  const [patientsSeen, setPatientsSeen] = useState("");
  const [cancelled, setCancelled] = useState("");
  const [noShow, setNoShow] = useState("");
  const [totalRevenue, setTotalRevenue] = useState("");
  const [prescriptionsGiven, setPrescriptionsGiven] = useState("");
  const [commonDiseases, setCommonDiseases] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (Modeldata) {
      setReportDate(formatDate(Modeldata.reportDate, "form"));
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

  // ✅ Validation Logic
  const validateFields = () => {
    const newErrors = {};
    const numberFields = [
      { name: "totalAppointments", label: "Total Appointments", value: totalAppointments },
      { name: "patientsSeen", label: "Patients Seen", value: patientsSeen },
      { name: "cancelled", label: "Cancelled", value: cancelled },
      { name: "noShow", label: "No-Show", value: noShow },
      { name: "totalRevenue", label: "Total Revenue", value: totalRevenue },
      { name: "prescriptionsGiven", label: "Prescriptions Given", value: prescriptionsGiven },
    ];

    // ✅ Date validation
    if (!reportDate) newErrors.reportDate = "Report date is required";

    // ✅ Number validations
    numberFields.forEach((field) => {
      if (field.value === "") {
        newErrors[field.name] = `${field.label} is required`;
      } else if (Number(field.value) < 0) {
        newErrors[field.name] = `${field.label} cannot be negative`;
      }
    });

    // ✅ Text validation (only letters, commas, and spaces allowed)
    if (commonDiseases && !/^[A-Za-z,\s]+$/.test(commonDiseases)) {
      newErrors.commonDiseases = "Only letters, commas, and spaces are allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearForm = () => {
    setReportDate("");
    setTotalAppointments("");
    setPatientsSeen("");
    setCancelled("");
    setNoShow("");
    setTotalRevenue("");
    setPrescriptionsGiven("");
    setCommonDiseases("");
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    const payload = {
      reportDate: new Date(reportDate),
      totalAppointments: Number(totalAppointments),
      patientsSeen: Number(patientsSeen),
      cancelled: Number(cancelled),
      noShow: Number(noShow),
      totalRevenue: Number(totalRevenue),
      prescriptionsGiven: Number(prescriptionsGiven),
      commonDiseases: commonDiseases
        .split(",")
        .map((d) => d.trim())
        .filter((d) => d),
    };

    try {
      let res;
      if (Modeltype === "Add") {
        res = await createReport(payload);
      } else {
        res = await updateReport(Modeldata._id, payload);
      }

      if (res?.status === 200 || res?.message?.includes("success")) {
        onResponse({
          messageType: "success",
          message: Modeltype === "Add" ? "Report added successfully" : "Report updated successfully",
          data: res?.data || payload,
        });
        clearForm();
        setOpen(false);
      } else {
        onResponse({
          messageType: "error",
          message: res?.message || "Operation failed",
        });
      }
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

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* LEFT SIDE */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Report Date"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
                error={!!errors.reportDate}
                helperText={errors.reportDate}
              />

              <TextField
                fullWidth
                type="number"
                label="Total Appointments"
                value={totalAppointments}
                onChange={(e) => setTotalAppointments(e.target.value)}
                sx={{ mb: 2 }}
                error={!!errors.totalAppointments}
                helperText={errors.totalAppointments}
              />

              <TextField
                fullWidth
                type="number"
                label="Patients Seen"
                value={patientsSeen}
                onChange={(e) => setPatientsSeen(e.target.value)}
                sx={{ mb: 2 }}
                error={!!errors.patientsSeen}
                helperText={errors.patientsSeen}
              />

              <TextField
                fullWidth
                type="number"
                label="Cancelled"
                value={cancelled}
                onChange={(e) => setCancelled(e.target.value)}
                sx={{ mb: 2 }}
                error={!!errors.cancelled}
                helperText={errors.cancelled}
              />
            </Grid>

            {/* RIGHT SIDE */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="No-Show"
                value={noShow}
                onChange={(e) => setNoShow(e.target.value)}
                sx={{ mb: 2 }}
                error={!!errors.noShow}
                helperText={errors.noShow}
              />

              <TextField
                fullWidth
                type="number"
                label="Revenue (PKR)"
                value={totalRevenue}
                onChange={(e) => setTotalRevenue(e.target.value)}
                sx={{ mb: 2 }}
                error={!!errors.totalRevenue}
                helperText={errors.totalRevenue}
              />

              <TextField
                fullWidth
                type="number"
                label="Prescriptions Given"
                value={prescriptionsGiven}
                onChange={(e) => setPrescriptionsGiven(e.target.value)}
                sx={{ mb: 2 }}
                error={!!errors.prescriptionsGiven}
                helperText={errors.prescriptionsGiven}
              />

              <TextField
                fullWidth
                label="Common Diseases (comma separated)"
                value={commonDiseases}
                onChange={(e) => setCommonDiseases(e.target.value)}
                sx={{ mb: 2 }}
                error={!!errors.commonDiseases}
                helperText={errors.commonDiseases}
              />
            </Grid>
          </Grid>

          {/* BUTTONS */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
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
        </form>
      </Box>
    </Modal>
  );
}
