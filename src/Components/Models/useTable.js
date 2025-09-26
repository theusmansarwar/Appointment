import React, { useEffect, useState } from "react";
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
<<<<<<< HEAD
 
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";



import { fetchallcategorylist, fetchPatients, fetchReport, fetchAppointment, fetchRecord } from "../../DAL/fetch";
=======
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchallcategorylist } from "../../DAL/fetch";
>>>>>>> 109c5ad261df44b694cde745048932f8fe2fed6c
import { formatDate } from "../../Utils/Formatedate";
import truncateText from "../../truncateText";
import { useNavigate } from "react-router-dom";
import AddCategories from "./addcategorie";
<<<<<<< HEAD
import { deleteAllCategories ,deletePatient , deleteReport, deleteAppointment, deleteRecord } from "../../DAL/delete";
import { useAlert } from "../Alert/AlertContext";
import DeleteModal from "./confirmDeleteModel";

import AddPatient from "./AddPatient";
import AddReport from "./AddReport";
import AddAppointment from "./Addappointment";
import AddRecord from "./AddRecord";
export function useTable({ attributes, pagedata=[], tableType, limitPerPage = 10 }) {
  const { showAlert } = useAlert();
  const savedState =
    JSON.parse(localStorage.getItem(`${tableType}-tableState`)) || {};

=======
import { deleteAllCategories } from "../../DAL/delete";
import { useAlert } from "../Alert/AlertContext";
import DeleteModal from "./confirmDeleteModel";

export function useTable({ attributes, tableType, limitPerPage = 10 }) {
  const { showAlert } = useAlert(); // Since you created a custom hook
  const savedState =
    JSON.parse(localStorage.getItem(`${tableType}-tableState`)) || {};
>>>>>>> 109c5ad261df44b694cde745048932f8fe2fed6c
  const [page, setPage] = useState(savedState.page || 1);
  const [rowsPerPage, setRowsPerPage] = useState(
    savedState.rowsPerPage || limitPerPage
  );
  const [searchQuery, setSearchQuery] = useState(savedState.searchQuery || "");
  const [selected, setSelected] = useState([]);

<<<<<<< HEAD
  // Modals
  const [openPatientModal, setOpenPatientModal] = useState(false);
  const [patientModelType, setPatientModelType] = useState("Add");

  const [openReportModal, setOpenReportModal] = useState(false);
  const [reportModelType, setReportModelType] = useState("Add");

  const [openAppointmentModal, setOpenAppointmentModal] = useState(false);
  const [appointmentModelType, setAppointmentModelType] = useState("Add");

  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [categoryModelType, setCategoryModelType] = useState("Add");

  const [openRecordModal, setOpenRecordModal] = useState(false);
  const [recordModelType, setRecordModelType] = useState("Add");

  const [modelData, setModelData] = useState({});
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const [openRow, setOpenRow] = useState(null);

  const toggleRow = (rowId) => {
    setOpenRow(openRow === rowId ? null : rowId);
  };
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

=======
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const navigate = useNavigate();
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [modeltype, setModeltype] = useState("Add");
  const [modelData, setModelData] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);
>>>>>>> 109c5ad261df44b694cde745048932f8fe2fed6c
  useEffect(() => {
    localStorage.setItem(
      `${tableType}-tableState`,
      JSON.stringify({ page, rowsPerPage, searchQuery })
    );
  }, [page, rowsPerPage, searchQuery, tableType]);

<<<<<<< HEAD
  // const fetchData = async () => {
  //   let response;
  //   if (tableType === "Categories") {
  //     response = await fetchallcategorylist(page, rowsPerPage, searchQuery);

  //     if (response.status === 400) {
  //       localStorage.removeItem("Token");
  //       navigate("/login");
  //     } else {
  //       setData(response.categories);
  //       setTotalRecords(response.total || response.categories.length);
  //     }
  //   } else {
  //     // Other table types just use passed data
  //     setData(pagedata || []);
  //     setTotalRecords(pagedata?.length || 0);
  //   }
  //   if (tableType === "PatientData") {
  //     response = await fetchPatients(page, rowsPerPage, searchQuery);

  //     if (response.status === 400) {
  //       localStorage.removeItem("Token");
  //       navigate("/login");
  //     } else {
  //       setData(response.patient);
  //       setTotalRecords(response.total || response.patient.length);
  //     }
  //   } else {
  //     // Other table types just use passed data
  //     setData(pagedata || []);
  //     setTotalRecords(pagedata?.length || 0);
  //   }
  // };
const fetchData = async () => {
  try {
    let response;

    if (tableType === "Categories") {
      response = await fetchallcategorylist(page, rowsPerPage, searchQuery);

      if (response.status === 400) {
        localStorage.removeItem("Token");
        navigate("/login");
      } else {
        setData(response?.categories || []); // ✅ always array
        setTotalRecords(response?.total || response?.categories?.length || 0);
      }

    } else if (tableType === "PatientData") {
      response = await fetchPatients(page, rowsPerPage, searchQuery);

      if (response.status === 400) {
        localStorage.removeItem("Token");
        navigate("/login");
      } else {
        // Some APIs send patient, some send patients
        const patients =
          response?.patient ||
          response?.patients ||
          response?.data ||
          [];
        setData(Array.isArray(patients) ? patients : [patients]); // ✅ always array
        setTotalRecords(response?.total || patients?.length || 0);
      }

    }
    else if (tableType === "Report") {
      response = await fetchReport(page, rowsPerPage, searchQuery);

      if (response.status === 400) {
        localStorage.removeItem("Token");
        navigate("/login");
      } else {
    const reports =
      response?.report ||
      response?.reports ||
      response?.data ||
      [];
        setData(Array.isArray(reports) ? reports : [reports]);
    setTotalRecords(response?.total || reports.length || 0);
      }

    } 
    else if (tableType === "Record") {
      response = await fetchRecord(page, rowsPerPage, searchQuery);

      if (response.status === 400) {
        localStorage.removeItem("Token");
        navigate("/login");
      } else {
    const records =
      response?.record ||
      response?.records ||
      response?.data ||
      [];
        setData(Array.isArray(records) ? records : [records]);
    setTotalRecords(response?.total || records.length || 0);
      }

    } 
    else if (tableType === "AppointmentManagement") {
      response = await fetchAppointment(page, rowsPerPage, searchQuery);
      if (response.status === 400) {
        localStorage.removeItem("Token");
        navigate("/login");
      } else {
    const appointments =
      response?.appointment ||
      response?.appointments ||
      response?.data ||
      [];
        setData(Array.isArray(appointments) ? appointments : [appointments]);
    setTotalRecords(response?.total || appointments.length || 0);
      }

    } 
      
    else {
      // All other table types
      setData(Array.isArray(pagedata) ? pagedata : []); // ✅ always array
      setTotalRecords(pagedata?.length || 0);
    }
  } catch (err) {
    console.error("Error fetching data:", err);
    setData([]); // fallback
  }
};
=======
  const fetchData = async () => {
    let response;
    if (tableType === "Categories") {
      response = await fetchallcategorylist(page, rowsPerPage, searchQuery);

      if (response.status == 400) {
        localStorage.removeItem("Token");
        navigate("/login");
      } else {
        setData(response.categories);
        setTotalRecords(response.categories.length);
      }
    }
  };
>>>>>>> 109c5ad261df44b694cde745048932f8fe2fed6c

  const handleSelectAllClick = (event) => {
    setSelected(event.target.checked ? data.map((row) => row._id) : []);
  };

  const isSelected = (id) => selected.includes(id);

  const handleChangePage = (_, newPage) => {
<<<<<<< HEAD
    setPage(newPage + 1); // MUI is 0-based
=======
    setPage(newPage + 1); // ✅ Adjust for API's 1-based pagination
>>>>>>> 109c5ad261df44b694cde745048932f8fe2fed6c
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
<<<<<<< HEAD
    setPage(1);
  };

  const handleViewClick = (row) => {
    setModelData(row);

    if (tableType === "Categories") {
      setCategoryModelType("Update");
      setOpenCategoryModal(true);
    } else if (tableType === "Record") {
      setRecordModelType("Update");
      setOpenRecordModal(true);
    } else if (tableType === "AppointmentManagement") {
      setAppointmentModelType("Update");
      setOpenAppointmentModal(true);
    } else if (tableType === "PatientData") {
      setPatientModelType("Update");
      setOpenPatientModal(true);
    } else if (tableType === "Report") {
      setReportModelType("Update");
      setOpenReportModal(true);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

 
const handleDelete = async () => {
  if (selected.length === 0) {
    showAlert("warning", "No items selected for deletion");
    return;
  }

  try {
    let response;

    if (tableType === "Categories") {
      // delete categories
      response = await deleteAllCategories({ ids: selected });
    } else if (tableType === "PatientData") {
      // delete patients
      response = await deletePatient({ ids: selected });
    }
    else if (tableType === "Report") {
      // delete patients
      response = await deleteReport({ ids: selected });
    }
     else if (tableType === "Record") {
      // delete patients
      response = await deleteRecord({ ids: selected });
    }
    else if (tableType === "AppointmentManagement") {
      // delete patients
      response = await deleteAppointment({ ids: selected });
    }
    if (response?.status === 200 || response?.success) {
      showAlert("success", response.message || "Deleted successfully");
      fetchData();
      setSelected([]);
    } else {
      showAlert("error", response?.message || "Failed to delete items");
    }

  } catch (error) {
    console.error("Error in delete request:", error);
    showAlert("error", "Something went wrong. Try again later.");
  }
};

  const handleAddButton = () => {
    setModelData({});
    if (tableType === "Categories") {
      setCategoryModelType("Add");
      setOpenCategoryModal(true);
    } else if (tableType === "Record") {
      setRecordModelType("Add");
      setOpenRecordModal(true);
    } else if (tableType === "AppointmentManagement") {
      setAppointmentModelType("Add");
      setOpenAppointmentModal(true);
    } else if (tableType === "PatientData") {
      setPatientModelType("Add");
      setOpenPatientModal(true);
    } else if (tableType === "Report") {
      setReportModelType("Add");
      setOpenReportModal(true);
=======
    setPage(0);
  };

  const handleViewClick = (category) => {
    if (tableType === "Categories") {
      setModelData(category);
      setModeltype("Update");
      setOpenCategoryModal(true);
    }
  };
const handleSearch = () => {
    fetchData();
  };

  const handleDelete = async () => {
    if (selected.length === 0) {
      showAlert("warning", "No items selected for deletion");
      return;
    }

    console.log("Attempting to delete IDs:", selected);

    try {
      let response;
      if (tableType === "Categories") {
        response = await deleteAllCategories({ ids: selected });
      }
      if (response.status === 200) {
        showAlert("success", response.message || "Deleted successfully");
        fetchData();
        setSelected([]);
      } else {
        showAlert("error", response.message || "Failed to delete items");
      }
    } catch (error) {
      console.error("Error in delete request:", error);
      showAlert("error", "Something went wrong. Try again later.");
    }
  };

  const handleAddButton = () => {
    if (tableType === "Categories") {
      setOpenCategoryModal(true);
      setModeltype("Add");
      setModelData();
>>>>>>> 109c5ad261df44b694cde745048932f8fe2fed6c
    }
  };

  const getNestedValue = (obj, path) => {
    return path
      .split(".")
<<<<<<< HEAD
      .reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : "N/A"), obj);
=======
      .reduce(
        (acc, key) => (acc && acc[key] !== undefined ? acc[key] : "N/A"),
        obj
      );
>>>>>>> 109c5ad261df44b694cde745048932f8fe2fed6c
  };

  const handleResponse = (response) => {
    showAlert(response.messageType, response.message);
    fetchData();
  };
<<<<<<< HEAD

=======
>>>>>>> 109c5ad261df44b694cde745048932f8fe2fed6c
  const handleDeleteClick = () => {
    setOpenDeleteModal(true);
  };

  return {
    tableUI: (
      <>
<<<<<<< HEAD
        {/* Modals */}
        <AddCategories
          open={openCategoryModal}
          setOpen={setOpenCategoryModal}
          Modeltype={categoryModelType}
          Modeldata={modelData}
          onResponse={handleResponse}
        />
        <AddRecord
          open={openRecordModal}
          setOpen={setOpenRecordModal}
          Modeltype={recordModelType}
          Modeldata={modelData}
          onResponse={handleResponse}
        />
        <AddAppointment
          open={openAppointmentModal}
          setOpen={setOpenAppointmentModal}
          Modeltype={appointmentModelType}
          Modeldata={modelData}
          onResponse={handleResponse}
        />
        <AddPatient
          open={openPatientModal}
          setOpen={setOpenPatientModal}
          Modeltype={patientModelType}
          Modeldata={modelData}
          onResponse={handleResponse}
        />
        <AddReport
          open={openReportModal}
          setOpen={setOpenReportModal}
          Modeltype={reportModelType}
=======
        <AddCategories
          open={openCategoryModal}
          setOpen={setOpenCategoryModal}
          Modeltype={modeltype}
>>>>>>> 109c5ad261df44b694cde745048932f8fe2fed6c
          Modeldata={modelData}
          onResponse={handleResponse}
        />
        <DeleteModal
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          onConfirm={handleDelete}
        />

<<<<<<< HEAD
        {/* Table */}
=======
>>>>>>> 109c5ad261df44b694cde745048932f8fe2fed6c
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", maxHeight: "95vh", boxShadow: "none" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5" sx={{ color: "var(--primary-color)" }}>
                {tableType} List
              </Typography>
<<<<<<< HEAD

              {tableType === "Categories" && (
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
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "var(--background-color)" },
                      "&:hover fieldset": {
                        borderColor: "var(--background-color)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "var(--background-color)",
                      },
                    },
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
              )}

=======
{tableType === "Categories" && (
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
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "var(--background-color)",
                        },
                        "&:hover fieldset": {
                          borderColor: "var(--background-color)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--background-color)",
                        },
                      },
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
                )}
>>>>>>> 109c5ad261df44b694cde745048932f8fe2fed6c
              {selected.length > 0 ? (
                <IconButton onClick={handleDeleteClick} sx={{ color: "red" }}>
                  <DeleteIcon />
                </IconButton>
              ) : (
<<<<<<< HEAD
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

=======
                tableType !== "Comments" && (
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
                )
              )}
            </Toolbar>
>>>>>>> 109c5ad261df44b694cde745048932f8fe2fed6c
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
                        checked={
                          data.length > 0 && selected.length === data.length
                        }
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    {attributes.map((attr) => (
                      <TableCell
<<<<<<< HEAD
                        key={attr.id}
=======
                        key={attr._id}
>>>>>>> 109c5ad261df44b694cde745048932f8fe2fed6c
                        sx={{ color: "var(--secondary-color)" }}
                      >
                        {attr.label}
                      </TableCell>
                    ))}
                    <TableCell sx={{ color: "var(--secondary-color)" }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
<<<<<<< HEAD

                <TableBody>
                  {data?.map((row) => {
=======
                <TableBody>
                  {data.map((row) => {
>>>>>>> 109c5ad261df44b694cde745048932f8fe2fed6c
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
                          <TableCell
                            key={attr.id}
                            sx={{ color: "var(--black-color)" }}
                          >
                            {attr.id === "createdAt" ||
                            attr.id === "publishedDate" ? (
                              formatDate(row[attr.id])
                            ) : attr.id === "published" ? (
                              <span
                                style={{
                                  color: row[attr.id]
                                    ? "var(--success-color)"
                                    : "var(--warning-color)",
                                  background: row[attr.id]
                                    ? "var(--success-bgcolor)"
                                    : "var(--warning-bgcolor)",
                                  padding: "5px",
<<<<<<< HEAD
=======
                                  minWidth: "200px",
>>>>>>> 109c5ad261df44b694cde745048932f8fe2fed6c
                                  borderRadius:
                                    "var(--border-radius-secondary)",
                                }}
                              >
                                {row[attr.id] ? "Public" : "Private"}
                              </span>
                            ) : row[attr.id] === 0 ? (
                              0
                            ) : typeof getNestedValue(row, attr.id) ===
                              "string" ? (
<<<<<<< HEAD
                              truncateText(getNestedValue(row, attr.id), 30)
=======
                              truncateText(getNestedValue(row, attr.id), 30) // ✅ Truncate text safely
>>>>>>> 109c5ad261df44b694cde745048932f8fe2fed6c
                            ) : (
                              getNestedValue(row, attr.id)
                            )}
                          </TableCell>
                        ))}

<<<<<<< HEAD

=======
>>>>>>> 109c5ad261df44b694cde745048932f8fe2fed6c
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
<<<<<<< HEAD
                       
=======
>>>>>>> 109c5ad261df44b694cde745048932f8fe2fed6c
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
<<<<<<< HEAD

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalRecords}
              rowsPerPage={rowsPerPage}
              page={page - 1}
=======
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalRecords} // ✅ Correct count from API
              rowsPerPage={rowsPerPage}
              page={page - 1} // ✅ Convert to 0-based index for Material-UI
>>>>>>> 109c5ad261df44b694cde745048932f8fe2fed6c
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </>
    ),
  };
}
