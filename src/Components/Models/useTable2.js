//  // src/Components/Models/useTable2.js
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
//   Toolbar,
//   Typography,
//   Checkbox,
//   Button,
//   IconButton,
//   Collapse,
// } from "@mui/material";
// import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
// import AddRecord from "./AddRecord";
// import DeleteModal from "./confirmDeleteModel";
// import { useAlert } from "../Alert/AlertContext";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom"; // 👈 added
// import { fetchRecord } from "../../DAL/fetch";
// import { deleteRecord } from "../../DAL/delete";
// export const useTable2 = ({
//   attributes,
//   pagedata=[],
//   tableType,
//   limitPerPage = 10,
// }) => {
//   const { showAlert } = useAlert();
//   const location = useLocation(); // 👈 added
//     const savedState =
//     JSON.parse(localStorage.getItem(`${tableType}-tableState`)) || {};

//   // State
//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(limitPerPage);
//   const [selected, setSelected] = useState([]);
//   const [data, setData] = useState([]);
//   const [totalRecords, setTotalRecords] = useState(0);
//  const [searchQuery, setSearchQuery] = useState(savedState.searchQuery || "");
//   // Modals
//   const [openRecordModal, setOpenRecordModal] = useState(false);
//   const [recordModelType, setRecordModelType] = useState("Add");
//   const [modelData, setModelData] = useState({});
//   const [openDeleteModal, setOpenDeleteModal] = useState(false);

//   // Subcategory expand
//   const [openRow, setOpenRow] = useState(null);
//   const toggleRow = (rowId) => {
//     setOpenRow(openRow === rowId ? null : rowId);
//   };
//  const navigate = useNavigate();
//   // ✅ Reset state on route change
//   useEffect(() => {
//     setOpenRow(null);
//     setSelected([]);
//     setOpenRecordModal(false);
//     setOpenDeleteModal(false);
//     setModelData({});
//     setPage(1);
//   }, [location.pathname]);

//   // Load initial data
//   // useEffect(() => {
//   //   setData(pagedata || []);
//   //   setTotalRecords(pagedata?.length || 0);
//   // }, [pagedata]);
// useEffect(() => {
//     fetchData();
//   }, [page, rowsPerPage]);

//   useEffect(() => {
//     localStorage.setItem(
//       `${tableType}-tableState`,
//       JSON.stringify({ page, rowsPerPage, searchQuery })
//     );
//   }, [page, rowsPerPage, searchQuery, tableType]);

//   // const fetchData = async () => {
//   //   let response;
//   //   if (tableType === "Categories") {
//   //     response = await fetchallcategorylist(page, rowsPerPage, searchQuery);

//   //     if (response.status === 400) {
//   //       localStorage.removeItem("Token");
//   //       navigate("/login");
//   //     } else {
//   //       setData(response.categories);
//   //       setTotalRecords(response.total || response.categories.length);
//   //     }
//   //   } else {
//   //     // Other table types just use passed data
//   //     setData(pagedata || []);
//   //     setTotalRecords(pagedata?.length || 0);
//   //   }
//   //   if (tableType === "PatientData") {
//   //     response = await fetchPatients(page, rowsPerPage, searchQuery);

//   //     if (response.status === 400) {
//   //       localStorage.removeItem("Token");
//   //       navigate("/login");
//   //     } else {
//   //       setData(response.patient);
//   //       setTotalRecords(response.total || response.patient.length);
//   //     }
//   //   } else {
//   //     // Other table types just use passed data
//   //     setData(pagedata || []);
//   //     setTotalRecords(pagedata?.length || 0);
//   //   }
//   // };
// const fetchData = async () => {
//   try {
//     let response;

   
//      if (tableType === "Record") {
//       response = await fetchRecord(page, rowsPerPage, searchQuery);

//       if (response.status === 400) {
//         localStorage.removeItem("Token");
//         navigate("/login");
//       } else {
//     const records =
//       response?.record ||
//       response?.records ||
//       response?.data ||
//       [];
//         setData(Array.isArray(records) ? records : [records]);
//     setTotalRecords(response?.total || records.length || 0);
//       }

//     } 
    
//     else {
//       // All other table types
//       setData(Array.isArray(pagedata) ? pagedata : []); // ✅ always array
//       setTotalRecords(pagedata?.length || 0);
//     }
//   } catch (err) {
//     console.error("Error fetching data:", err);
//     setData([]); // fallback
//   }
// };
//   // const handleChangePage = (_, newPage) => {
//   //   setPage(newPage + 1);
//   // };
//   // const handleChangeRowsPerPage = (event) => {
//   //   setRowsPerPage(parseInt(event.target.value, 10));
//   //   setPage(1);
//   // };
//  const handleChangePage = (_, newPage) => {
//   setPage(newPage + 1); // because our state page starts at 1
// };

// const handleChangeRowsPerPage = (event) => {
//   setRowsPerPage(parseInt(event.target.value, 10));
//   setPage(1); // reset to first page on rowsPerPage change
// };
//   const handleSelectAllClick = (event) => {
//     setSelected(event.target.checked ? data.map((row) => row.id) : []);
//   };
//   const isSelected = (id) => selected.includes(id);

//   const handleAddButton = () => {
//     setModelData({});
//     setRecordModelType("Add");
//     setOpenRecordModal(true);
//   };

//   const handleViewClick = (row) => {
//     setModelData(row);
//     setRecordModelType("Update");
//     setOpenRecordModal(true);
//   };
// const getNestedValue = (obj, path) => {
//     return path
//       .split(".")
//       .reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : "N/A"), obj);
//   };
//   const handleDeleteClick = () => {
//     if (selected.length === 0) {
//       showAlert("warning", "No items selected for deletion");
//       return;
//     }
//     setOpenDeleteModal(true);
//   };

//   // const handleDelete = () => {
//   //   // your delete logic here
//   //   showAlert("success", "Deleted successfully");
//   //   setSelected([]);
//   //   setOpenDeleteModal(false);
//   // };
// // const handleDelete = async () => {
// //   if (selected.length === 0) {
// //     showAlert("warning", "No items selected for deletion");
// //     return;
// //   }

// //   try {
// //     let response;

   
// //  if (tableType === "Record") {
// //       // delete patients
// //       response = await deleteRecord({ ids: selected });
// //     }
    
// //     else if (response?.status === 200 || response?.success) {
// //       showAlert("success", response.message || "Deleted successfully");
// //       fetchData();
// //       setSelected([]);
// //     } else {
// //       showAlert("error", response?.message || "Failed to delete items");
// //     }

// //   } catch (error) {
// //     console.error("Error in delete request:", error);
// //     showAlert("error", "Something went wrong. Try again later.");
// //   }
// // };
// const handleDelete = async () => {
//   if (selected.length === 0) {
//     showAlert("warning", "No items selected for deletion");
//     return;
//   }

//   try {
//     let response;

//     // match same tableType you use in fetchData
//     if (tableType === "Record") {
//       response = await deleteRecord({ ids: selected });
//     } else {
//       // if other table types also need deletion logic add here
//       response = { status: 200, message: "Deleted successfully" };
//     }

//     if (response?.status === 200 || response?.success) {
//       showAlert("success", response.message || "Deleted successfully");
//       await fetchData();
//       setSelected([]);
//       setOpenDeleteModal(false); // ✅ close modal after delete
//     } else {
//       showAlert("error", response?.message || "Failed to delete items");
//     }
//   } catch (error) {
//     console.error("Error in delete request:", error);
//     showAlert("error", "Something went wrong. Try again later.");
//   }
// };

//   const handleResponse = () => {
//     // refresh or set new data here
//     setOpenRecordModal(false);
//   };

//   const tableUI = (
//     <>
//       {/* Modals */}
//       <AddRecord
//         open={openRecordModal}
//         setOpen={setOpenRecordModal}
//         Modeltype={recordModelType}
//         Modeldata={modelData}
//         onResponse={handleResponse}
//       />
//       <DeleteModal
//         open={openDeleteModal}
//         setOpen={setOpenDeleteModal}
//         onConfirm={handleDelete}
//       />
      

//       <Box sx={{ width: "100%" }}>
//         <Paper sx={{ width: "100%", boxShadow: "none" }}>
//           <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//             <Typography variant="h5" sx={{ color: "var(--primary-color)" }}>
//               {tableType} List
//             </Typography>

//             {selected.length > 0 ? (
//               <IconButton onClick={handleDeleteClick} sx={{ color: "red" }}>
//                 <DeleteIcon />
//               </IconButton>
//             ) : (
//               <Button
//                 sx={{
//                   background: "var(--horizontal-gradient)",
//                   color: "var(--white-color)",
//                   borderRadius: "var(--border-radius-secondary)",
//                   "&:hover": { background: "var(--vertical-gradient)" },
//                 }}
//                 onClick={handleAddButton}
//               >
//                 Add {tableType}
//               </Button>
//             )}
//           </Toolbar>

//           <TableContainer>
//             <Table stickyHeader>
//               <TableHead>
//                 <TableRow>
//                   <TableCell padding="checkbox">
//                     <Checkbox
//                       sx={{ color: "var(--primary-color)" }}
//                       indeterminate={
//                         selected.length > 0 && selected.length < data.length
//                       }
//                       checked={
//                         data.length > 0 && selected.length === data.length
//                       }
//                       onChange={handleSelectAllClick}
//                     />
//                   </TableCell>
//                   <TableCell />
//                   {attributes.map((attr) => (
//                     <TableCell
//                       key={attr.id}
//                       sx={{ color: "var(--secondary-color)" }}
//                     >
//                       {attr.label}
//                     </TableCell>
//                   ))}
//                   <TableCell>Action</TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {data?.map((row) => {
//                   const isItemSelected = isSelected(row.id);
//                   return (
//                     <React.Fragment key={row.id}>
//                       <TableRow selected={isItemSelected}>
//                         <TableCell padding="checkbox">
//                           <Checkbox
//                             sx={{ color: "var(--primary-color)" }}
//                             checked={isItemSelected}
//                             onChange={() => {
//                               setSelected((prev) =>
//                                 isItemSelected
//                                   ? prev.filter((id) => id !== row.id)
//                                   : [...prev, row.id]
//                               );
//                             }}
//                           />
//                         </TableCell>

//                         <TableCell>
//                           {row.pastVisits && row.pastVisits.length > 0 && (
//                             <IconButton
//                               size="small"
//                               onClick={() => toggleRow(row.id)}
//                             >
//                               {openRow === row.id ? (
//                                 <KeyboardArrowUp />
//                               ) : (
//                                 <KeyboardArrowDown />
//                               )}
//                             </IconButton>
//                           )}
//                         </TableCell>

//                         {attributes?.map((attr) => (
//                           <TableCell key={attr.id}>{row[attr.id]}</TableCell>
//                         ))}

//                         <TableCell>
//                           <span
//                             onClick={() => handleViewClick(row)}
//                             style={{
//                               color: "var(--primary-color)",
//                               textDecoration: "underline",
//                               cursor: "pointer",
//                             }}
//                           >
//                             View
//                           </span>
//                         </TableCell>
//                       </TableRow>

//                       {/* Subcategory (Past Visits) */}
//                       {row.pastVisits && row.pastVisits.length > 0 && (
//                         <TableRow>
//                           <TableCell
//                             style={{ paddingBottom: 0, paddingTop: 0 }}
//                             colSpan={attributes.length + 3}
//                           >
//                             <Collapse
//                               in={openRow === row.id}
//                               timeout="auto"
//                               unmountOnExit
//                             >
//                               <Box sx={{ margin: 1 }}>
//                                 <Typography variant="subtitle1">
//                                   Past Visits
//                                 </Typography>
//                                 <Table size="small">
//                                   <TableHead>
//                                     <TableRow>
//                                       <TableCell>Date</TableCell>
//                                       <TableCell>Time</TableCell>
//                                       <TableCell>Reason</TableCell>
//                                       <TableCell>Prescription</TableCell>
//                                       <TableCell>Dues</TableCell>
//                                     </TableRow>
//                                   </TableHead>
//                                   <TableBody>
//                                     {row.pastVisits.map((visit, idx) => (
//                                       <TableRow key={idx}>
//                                         <TableCell>{visit.date}</TableCell>
//                                         <TableCell>{visit.time}</TableCell>
//                                         <TableCell>{visit.reason}</TableCell>
//                                         <TableCell>
//                                           {visit.prescription}
//                                         </TableCell>
//                                         <TableCell>{visit.dues}</TableCell>
//                                       </TableRow>
//                                     ))}
//                                   </TableBody>
//                                 </Table>
//                               </Box>
//                             </Collapse>
//                           </TableCell>
//                         </TableRow>
//                       )}
//                     </React.Fragment>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={totalRecords}
//             rowsPerPage={rowsPerPage}
//             page={page - 1}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           /> */}
//           <TablePagination
//   rowsPerPageOptions={[5, 10, 25]}
//   component="div"
//   count={totalRecords}
//   rowsPerPage={rowsPerPage}
//   page={page - 1} // ✅ because our page starts at 1
//   onPageChange={handleChangePage}
//   onRowsPerPageChange={handleChangeRowsPerPage}
// />

//         </Paper>
//       </Box>
//     </>
//   );

//   return { tableUI };
// };
// src/Components/Models/useTable2.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
  Checkbox,
  Button,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";

import AddRecord from "./AddRecord";
import DeleteModal from "./confirmDeleteModel";
import { useAlert } from "../Alert/AlertContext";
import { useNavigate, useLocation } from "react-router-dom";

import { fetchRecord } from "../../DAL/fetch";
import { deleteRecord } from "../../DAL/delete";

export const useTable2 = ({
  attributes,
  pagedata = [],
  tableType,
  limitPerPage = 10,
}) => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  // localStorage state
  const savedState =
    JSON.parse(localStorage.getItem(`${tableType}-tableState`)) || {};

  // States
  const [page, setPage] = useState(savedState.page || 1);
  const [rowsPerPage, setRowsPerPage] = useState(
    savedState.rowsPerPage || limitPerPage
  );
  const [searchQuery, setSearchQuery] = useState(savedState.searchQuery || "");
  const [selected, setSelected] = useState([]);

  // Modal states
  const [openRecordModal, setOpenRecordModal] = useState(false);
  const [recordModelType, setRecordModelType] = useState("Add");
  const [modelData, setModelData] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // Data state
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  // Reset on route change
  useEffect(() => {
    setSelected([]);
    setOpenRecordModal(false);
    setOpenDeleteModal(false);
    setModelData({});
    setPage(1);
  }, [location.pathname]);

  // Fetch data
  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(
      `${tableType}-tableState`,
      JSON.stringify({ page, rowsPerPage, searchQuery })
    );
  }, [page, rowsPerPage, searchQuery, tableType]);

  const fetchData = async () => {
    try {
      let response;

      if (tableType === "Record") {
        response = await fetchRecord(page, rowsPerPage, searchQuery);

        if (response.status === 400) {
          localStorage.removeItem("Token");
          navigate("/login");
        } else {
          const records = response?.record || response?.records || response?.data || [];
          setData(Array.isArray(records) ? records : [records]);
          setTotalRecords(response?.total || records.length || 0);
        }
      } else {
        // fallback
        setData(Array.isArray(pagedata) ? pagedata : []);
        setTotalRecords(pagedata?.length || 0);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setData([]);
    }
  };

  // Pagination
  const handleChangePage = (_, newPage) => {
    setPage(newPage + 1);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  // Selection
  const handleSelectAllClick = (event) => {
    setSelected(event.target.checked ? data.map((row) => row._id) : []);
  };
  const isSelected = (id) => selected.includes(id);

  // Add/View
  const handleAddButton = () => {
    setModelData({});
    setRecordModelType("Add");
    setOpenRecordModal(true);
  };
  const handleViewClick = (row) => {
    setModelData(row);
    setRecordModelType("Update");
    setOpenRecordModal(true);
  };

  // Delete
  const handleDeleteClick = () => {
    if (selected.length === 0) {
      showAlert("warning", "No items selected for deletion");
      return;
    }
    setOpenDeleteModal(true);
  };

  const handleDelete = async () => {
    if (selected.length === 0) {
      showAlert("warning", "No items selected for deletion");
      return;
    }

    try {
      let response;
      if (tableType === "Record") {
        response = await deleteRecord({ ids: selected });
      }

      if (response?.status === 200 || response?.success) {
        showAlert("success", response.message || "Deleted successfully");
        await fetchData();
        setSelected([]);
        setOpenDeleteModal(false);
      } else {
        showAlert("error", response?.message || "Failed to delete items");
      }
    } catch (error) {
      console.error("Error in delete request:", error);
      showAlert("error", "Something went wrong. Try again later.");
    }
  };

  // Search
  const handleSearch = () => {
    fetchData();
  };

  // Table UI
  const tableUI = (
    <>
      <AddRecord
        open={openRecordModal}
        setOpen={setOpenRecordModal}
        Modeltype={recordModelType}
        Modeldata={modelData}
        onResponse={fetchData}
      />
      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        onConfirm={handleDelete}
      />

      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", boxShadow: "none" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" sx={{ color: "var(--primary-color)" }}>
              {tableType} List
            </Typography>

            <TextField
              size="small"
              placeholder="Search..."
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                minWidth: 200,
                backgroundColor: "white",
                borderRadius: 1,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon
                      onClick={handleSearch}
                      sx={{
                        cursor: "pointer",
                        color: "var(--background-color)",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />

            {selected.length > 0 ? (
              <IconButton onClick={handleDeleteClick} sx={{ color: "red" }}>
                <DeleteIcon />
              </IconButton>
            ) : (
              <Button
                sx={{
                  background: "var(--horizontal-gradient)",
                  color: "var(--white-color)",
                  borderRadius: "var(--border-radius-secondary)",
                  "&:hover": { background: "var(--vertical-gradient)" },
                }}
                onClick={handleAddButton}
              >
                Add {tableType}
              </Button>
            )}
          </Toolbar>

          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      sx={{ color: "var(--primary-color)" }}
                      indeterminate={
                        selected.length > 0 && selected.length < data.length
                      }
                      checked={data.length > 0 && selected.length === data.length}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  {attributes.map((attr) => (
                    <TableCell
                      key={attr.id}
                      sx={{ color: "var(--secondary-color)" }}
                    >
                      {attr.label}
                    </TableCell>
                  ))}
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data?.map((row) => {
                  const isItemSelected = isSelected(row._id);
                  return (
                    <TableRow key={row._id} selected={isItemSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          sx={{ color: "var(--primary-color)" }}
                          checked={isItemSelected}
                          onChange={() => {
                            setSelected((prev) =>
                              isItemSelected
                                ? prev.filter((id) => id !== row._id)
                                : [...prev, row._id]
                            );
                          }}
                        />
                      </TableCell>

                      {attributes.map((attr) => (
                        <TableCell key={attr.id}>{row[attr.id]}</TableCell>
                      ))}

                      <TableCell>
                        <span
                          onClick={() => handleViewClick(row)}
                          style={{
                            color: "var(--primary-color)",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                        >
                          View
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalRecords}
            rowsPerPage={rowsPerPage}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );

  return { tableUI };
};
