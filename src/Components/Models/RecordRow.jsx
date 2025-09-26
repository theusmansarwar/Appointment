// // src/Components/Models/RecordRow.jsx
// import React, { useState } from "react";
// import {
//   TableRow,
//   TableCell,
//   Collapse,
//   IconButton,
//   Box,
//   Typography,
//   Table,
//   TableHead,
//   TableBody,
// } from "@mui/material";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// const RecordRow = ({ record }) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <TableRow>
//         <TableCell>
//           <IconButton onClick={() => setOpen(!open)}>
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </TableCell>
//         <TableCell>{record.patientName}</TableCell>
//         <TableCell>{record.appointmentDate}</TableCell>
//         <TableCell>{record.appointmentTime}</TableCell>
//         <TableCell>{record.reason}</TableCell>
//         <TableCell>{record.prescription}</TableCell>
//         <TableCell>{record.dues}</TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell
//           style={{ paddingBottom: 0, paddingTop: 0 }}
//           colSpan={7}
//         >
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box margin={1}>
//               <Typography variant="subtitle1" gutterBottom>
//                 Past Visits
//               </Typography>
//               <Table size="small">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Date</TableCell>
//                     <TableCell>Time</TableCell>
//                     <TableCell>Reason</TableCell>
//                     <TableCell>Prescription</TableCell>
//                     <TableCell>Dues</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {record.pastVisits && record.pastVisits.length > 0 ? (
//                     record.pastVisits.map((visit, idx) => (
//                       <TableRow key={idx}>
//                         <TableCell>{visit.date}</TableCell>
//                         <TableCell>{visit.time}</TableCell>
//                         <TableCell>{visit.reason}</TableCell>
//                         <TableCell>{visit.prescription}</TableCell>
//                         <TableCell>{visit.dues}</TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={5}>No past visits</TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </>
//   );
// };

// export default RecordRow;
