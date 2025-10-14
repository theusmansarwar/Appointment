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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  fetchallcategorylist,
  
  fetchallPatientslist,
  fetchallReportlist,
  fetchallRecordlist,
  fetchallAppointmentlist
} from "../../DAL/fetch";

import {
  deleteAllCategories,
  deletePatient,
  deleteReport,
  deleteAppointment,
  deleteRecord,
} from "../../DAL/delete";

import { formatDate } from "../../Utils/Formatedate";
import truncateText from "../../truncateText";
import { useNavigate } from "react-router-dom";
import AddCategories from "./addcategorie";
import AddPatient from "./AddPatient";
import AddReport from "./AddReport";
import AddAppointment from "./Addappointment";
import AddRecord from "./AddRecord";
import { useAlert } from "../Alert/AlertContext";
import DeleteModal from "./confirmDeleteModel";
import RecordDetailPage from "./RecordDetailPage";

export function useTable({ attributes, pagedata = [], tableType, limitPerPage = 10 }) {
  const { showAlert } = useAlert();
  const savedState =
    JSON.parse(localStorage.getItem(`${tableType}-tableState`)) || {};

  // pagination & UI state (page is 1-based for API)
  const [page, setPage] = useState(savedState.page || 1);
  const [rowsPerPage, setRowsPerPage] = useState(savedState.rowsPerPage || limitPerPage);

  const [searchQuery, setSearchQuery] = useState(savedState.searchQuery || "");
  const [selected, setSelected] = useState([]);

  // modal & model state
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [categoryModelType, setCategoryModelType] = useState("Add");

  const [openPatientModal, setOpenPatientModal] = useState(false);
  const [patientModelType, setPatientModelType] = useState("Add");
  
  const [openReportModal, setOpenReportModal] = useState(false);
  const [reportModelType, setReportModelType] = useState("Add");

  const [openAppointmentModal, setOpenAppointmentModal] = useState(false);
  const [appointmentModelType, setAppointmentModelType] = useState("Add");

  const [openRecordModal, setOpenRecordModal] = useState(false);
  const [recordModelType, setRecordModelType] = useState("Add");

  const [modelData, setModelData] = useState({});
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  useEffect(() => {
    localStorage.setItem(
      `${tableType}-tableState`,
      JSON.stringify({ page, rowsPerPage, searchQuery })
    );
  }, [page, rowsPerPage, searchQuery, tableType]);

  const ensureArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    return [val];
  };
  
  
  const fetchData = async () => {
    try {
      let response;
      // Categories
      if (tableType === "Categories") {
        response = await fetchallcategorylist(page, rowsPerPage, searchQuery);

        if (response?.status === 400) {
          localStorage.removeItem("Token");
          navigate("/login");
          return;
        }

        const categories = ensureArray(response?.categories || response?.data || []);
        setData(categories);
        setTotalRecords(response?.total ?? categories.length);
        return;
      }

      // PatientData
      if (tableType === "PatientData") {
        response = await fetchallPatientslist(page, rowsPerPage, searchQuery);

        if (response?.status === 400) {
          localStorage.removeItem("Token");
          navigate("/login");
          return;
        }

        const patients = ensureArray(response?.patient || response?.patients || response?.data);
        setData(patients);
        setTotalRecords(response?.total ?? patients.length);
        return;
      }

      // Report
      if (tableType === "Report") {
        response = await fetchallReportlist(page, rowsPerPage, searchQuery);

        if (response?.status === 400) {
          localStorage.removeItem("Token");
          navigate("/login");
          return;
        }

        const reports = ensureArray(response?.report || response?.reports || response?.data);
        setData(reports);
        setTotalRecords(response?.total ?? reports.length);
        return;
      }

      // Record
      if (tableType === "Record") {
        response = await fetchallRecordlist(page, rowsPerPage, searchQuery);

        if (response?.status === 400) {
          localStorage.removeItem("Token");
          navigate("/login");
          return;
        }

        const records = ensureArray(response?.record || response?.records || response?.data);
        setData(records);
        setTotalRecords(response?.total ?? records.length);
        return;
      }
 
      // AppointmentManagement
      if (tableType === "Appointment") {
        response = await fetchallAppointmentlist(page, rowsPerPage, searchQuery);

        if (response?.status === 400) {
          localStorage.removeItem("Token");
          navigate("/login");
          return;
        }

        const appts = ensureArray(response?.appointment || response?.appointments || response?.data);
        setData(appts);
        setTotalRecords(response?.total ?? appts.length);
        return;
      }

      // Fallback: use passed pagedata
      setData(Array.isArray(pagedata) ? pagedata : []);
      setTotalRecords(pagedata?.length ?? 0);
    } catch (err) {
      console.error("Error fetching data:", err);
      setData([]);
      setTotalRecords(0);
    }
  };

  const handleSelectAllClick = (event) => {
    setSelected(event.target.checked ? data.map((row) => row._id || row.id) : []);
  };

  const isSelected = (id) => selected.includes(id);

  const handleChangePage = (_, newPage) => {
    setPage(newPage + 1); // MUI is 0-based; our API uses 1-based
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1); // reset to first page
  };

  // const handleViewClick = (row) => {
  //   setModelData(row || {});
  //   // open the appropriate modal depending on tableType
  //   if (tableType === "Categories") {
  //     setCategoryModelType("Update");
  //     setOpenCategoryModal(true);
  //   // } else if (tableType === "Record") {
  //   //   // setRecordModelType("Update");
  //   //   // setOpenRecordModal(true);
  //   //   navigate(`/records/${row._id}`, { state: row });
  //   } if (tableType === "Record") {
  //   navigate(`/records/${row._id}`, { state: row }); // ✅ go to record page
  // } else  {
  //   setModelData(row || {});
  //   } else if (tableType === "Appointment") {
  //     setAppointmentModelType("Update");
  //     setOpenAppointmentModal(true);
  //   } else if (tableType === "PatientData") {
  //     setPatientModelType("Update");
  //     setOpenPatientModal(true);
  //   } else if (tableType === "Report") {
  //     setReportModelType("Update");
  //     setOpenReportModal(true);
  //   }
  // };
  const handleViewClick = (row) => {
  if (tableType === "Categories") {
    setModelData(row || {});
    setCategoryModelType("Update");
    setOpenCategoryModal(true);
  } else if (tableType === "Record") {
  navigate(`/record/${row._id}`, { state: row }); // go to Past Visit page
}
   else if (tableType === "Appointment") {
    setModelData(row || {});
    setAppointmentModelType("Update");
    setOpenAppointmentModal(true);
  } else if (tableType === "PatientData") {
    setModelData(row || {});
    setPatientModelType("Update");
    setOpenPatientModal(true);
  } else if (tableType === "Report") {
    setModelData(row || {});
    setReportModelType("Update");
    setOpenReportModal(true);
  } 
  // else if (tableType === "RecordDetailPage") {
  //   setModelData(row || {});
  //   setRecordDetailPageModelType("Update");
  //   setOpenReportModal(true);
  else {
    setModelData(row || {});
  }
};


 
const handleSearch = (value) => {
  setPage(1);
  fetchData(value || searchQuery); // force using latest
};


  const handleDelete = async () => {
    if (selected.length === 0) {
      showAlert("warning", "No items selected for deletion");
      return;
    }

    try {
      let response;
      if (tableType === "Categories") {
        response = await deleteAllCategories({ ids: selected });
      } else if (tableType === "PatientData") {
        response = await deletePatient({ ids: selected });
      } else if (tableType === "Report") {
        response = await deleteReport({ ids: selected });
      } else if (tableType === "Record") {
        response = await deleteRecord({ ids: selected });
      } else if (tableType === "Appointment") {
        response = await deleteAppointment({ ids: selected });
      } else {
        showAlert("error", "Delete not supported for this table");
        return;
      }

      if (response?.status === 200 || response?.success) {
        showAlert("success", response?.message || "Deleted successfully");
        fetchData();
        setSelected([]);
      } else {
        showAlert("error", response?.message || "Failed to delete items");
      }
    } catch (error) {
      console.error("Error in delete request:", error);
      showAlert("error", "Something went wrong. Try again later.");
    } finally {
      setOpenDeleteModal(false);
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
    } else if (tableType === "Appointment") {
      setAppointmentModelType("Add");
      setOpenAppointmentModal(true);
    } else if (tableType === "PatientData") {
      setPatientModelType("Add");
      setOpenPatientModal(true);
    } else if (tableType === "Report") {
      setReportModelType("Add");
      setOpenReportModal(true);
    }
  };

  const getNestedValue = (obj, path) => {
    return path
      .split(".")
      .reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : "N/A"), obj);
  };

  const handleResponse = (response) => {
    if (!response) return;
    showAlert(response.messageType || "success", response.message || "Done");
    fetchData();
  };

  const handleDeleteClick = () => {
    setOpenDeleteModal(true);
  };

  // The UI fragment returned by the hook
  return {
    tableUI: (
      <>
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
          Modeldata={modelData}
          onResponse={handleResponse}
        />

        <DeleteModal
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          onConfirm={handleDelete}
        />

        {/* Table */}
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", maxHeight: "95vh", boxShadow: "none" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5" sx={{ color: "var(--primary-color)" }}>
                {tableType} List
              </Typography>

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

{tableType === "Record" && (
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
                          // onClick={handleSearch}
                          onClick={() => handleSearch(searchQuery)}
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
{tableType === "Appointment" && (
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
             {tableType === "Report" && (
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
              {tableType === "PatientData" && (
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
              {selected.length > 0 ? (
                <IconButton onClick={handleDeleteClick} sx={{ color: "red" }}>
                  <DeleteIcon />
                </IconButton>
              ) : (
                tableType !== "Comments" && (
                  <Button
                    sx={{
                      background: "linear-gradient(90deg, #8B0000, #B22222)",
                        color: "#fff",
                      borderRadius: "8px)",
                      "&:hover": { background: "linear-gradient(90deg, #B22222, #8B0000)" },
                    }}
                    onClick={handleAddButton}
                  >
                    Add {tableType}
                  </Button>
                )
              )}
            </Toolbar>

            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        sx={{ color: "#8B0000" }}
                        indeterminate={selected.length > 0 && selected.length < data.length}
                        checked={data.length > 0 && selected.length === data.length}
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    {attributes.map((attr) => (
                      <TableCell key={attr.id} sx={{ color: "var(--secondary-color)" }}>
                        {attr.label}
                      </TableCell>
                    ))}
                    <TableCell sx={{ color: "#B22222" }}>Action</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {data.map((row) => {
                    const rowId = row._id || row.id;
                    const isItemSelected = isSelected(rowId);
                    return (
                      <TableRow key={rowId} selected={isItemSelected}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            sx={{ color: "#8B0000" }}
                            checked={isItemSelected}
                            onChange={() => {
                              setSelected((prev) =>
                                isItemSelected ? prev.filter((id) => id !== rowId) : [...prev, rowId]
                              );
                            }}
                          />
                        </TableCell>

                        {attributes.map((attr) => (
                          <TableCell key={attr.id} sx={{ color: "var(--black-color)" }}>
                            {attr.id === "createdAt" || attr.id === "publishedDate"|| attr.id === "reportDate" || attr.id === "appointmentDate"  ? (
                
                              formatDate(row[attr.id],"display")
                            ) : attr.id === "published" ? (
                              <span
                                style={{
                                  color: row[attr.id] ? "var(--success-color)" : "var(--warning-color)",
                                  background: row[attr.id] ? "var(--success-bgcolor)" : "var(--warning-bgcolor)",
                                  padding: "5px",
                                  borderRadius: "var(--border-radius-secondary)",
                                }}
                              >
                                {row[attr.id] ? "Public" : "Private"}
                              </span>
                            ) : row[attr.id] === 0 ? (
                              0
                            ) : typeof getNestedValue(row, attr.id) === "string" ? (
                              truncateText(getNestedValue(row, attr.id), 30)
                            ) : (
                              getNestedValue(row, attr.id)
                            )}
                          </TableCell>
                        ))} 


                        <TableCell>
                          <span
                            onClick={() => handleViewClick(row)}
                            style={{
                              color: "#B22222",
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
    ),
  };
}
export default useTable;
