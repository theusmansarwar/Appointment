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
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  fetchallcategorylist,
  fetchallRoleslist,
  fetchallUserlist,
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
  deleteAllUsers,
  deleteAllRoles
} from "../../DAL/delete";

import { formatDate } from "../../Utils/Formatedate";
import truncateText from "../../truncateText";
import { useNavigate, useLocation } from "react-router-dom";
import AddCategories from "./addcategorie";
import AddPatient from "./AddPatient";
import AddReport from "./AddReport";
import AddAppointment from "./Addappointment";
import AddRecord from "./AddRecord";
import { useAlert } from "../Alert/AlertContext";
import DeleteModal from "./confirmDeleteModel";
import AddRoles from "./AddRoles";
import AddUser from "./AddUser";
import { formatetime } from "../../Utils/Formatetime";
import { brown } from "@mui/material/colors";
export function useTable({ attributes, pagedata = [], tableType, limitPerPage = 10 }) {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  
  const savedState = JSON.parse(localStorage.getItem(`${tableType}-tableState`)) || {};

  // pagination & UI state (page is 1-based for API)
  const [page, setPage] = useState(savedState.page || 1);
  const [rowsPerPage, setRowsPerPage] = useState(savedState.rowsPerPage || limitPerPage);
  const [searchQuery, setSearchQuery] = useState(savedState.searchQuery || "");
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // 🆕 Loading state

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

  const [openUserModal, setOpenUserModal] = useState(false);
  const [userModelType, setUserModelType] = useState("Add");

  const [openRolesModal, setOpenRolesModal] = useState(false);
  const [rolesModelType, setRolesModelType] = useState("Add");

  const [modelData, setModelData] = useState({});
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // Save current location for this table type
  useEffect(() => {
    localStorage.setItem(`${tableType}-lastPath`, location.pathname);
  }, [location.pathname, tableType]);

  // Fetch data when page, rowsPerPage, or searchQuery changes
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, searchQuery]);

  // Save table state to localStorage
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
    setIsLoading(true); // 🆕 Start loading
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
      if (tableType === "Patient Data") {
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

      // User
      if (tableType === "User") {
        response = await fetchallUserlist(page, rowsPerPage, searchQuery);

        if (response?.status === 400) {
          localStorage.removeItem("Token");
          navigate("/login");
          return;
        }

        const user = ensureArray(response?.user || response?.users || response?.data);
        setData(user);
        setTotalRecords(response?.total ?? user.length);
        return;
      }

      // Roles
      if (tableType === "Roles") {
        response = await fetchallRoleslist(page, rowsPerPage, searchQuery);

        if (response?.status === 400) {
          localStorage.removeItem("Token");
          navigate("/login");
          return;
        }

        const roles = ensureArray(response?.role || response?.roles || response?.data);
        setData(roles);
        setTotalRecords(response?.total ?? roles.length);
        return;
      }
 
      // Appointment
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
    } finally {
      setIsLoading(false); // 🆕 Stop loading
    }
  };

  const handleSelectAllClick = (event) => {
    setSelected(event.target.checked ? data.map((row) => row._id || row.id) : []);
  };

  const isSelected = (id) => selected.includes(id);

  const handleChangePage = (_, newPage) => {
    const newPageNumber = newPage + 1; // MUI is 0-based; our API uses 1-based
    
    // Don't allow going to pages that don't exist
    const maxPage = Math.ceil(totalRecords / rowsPerPage);
    if (newPageNumber > maxPage) {
      return;
    }
    
    setPage(newPageNumber);
    setSelected([]); // Clear selections when changing page
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    
    // Calculate if current page is valid with new rows per page
    const maxPage = Math.ceil(totalRecords / newRowsPerPage);
    if (page > maxPage) {
      setPage(1); // Reset to first page if current page doesn't exist anymore
    }
    
    setSelected([]); // Clear selections
  };

  const handleViewClick = (row) => {
    if (tableType === "Categories") {
      setModelData(row || {});
      setCategoryModelType("Update");
      setOpenCategoryModal(true);
    } else if (tableType === "Record") {
      navigate(`/record/${row._id}`, { state: row });
    } else if (tableType === "Appointment") {
      setModelData(row || {});
      setAppointmentModelType("Update");
      setOpenAppointmentModal(true);
    } else if (tableType === "Patient Data") {
      setModelData(row || {});
      setPatientModelType("Update");
      setOpenPatientModal(true);
    } else if (tableType === "Report") {
      setModelData(row || {});
      setReportModelType("Update");
      setOpenReportModal(true);
    } else if (tableType === "User") {
      setModelData(row || {});
      setUserModelType("Update");
      setOpenUserModal(true);
    } else if (tableType === "Roles") {
      setModelData(row || {});
      setRolesModelType("Update");
      setOpenRolesModal(true);
    } else {
      setModelData(row || {});
    }
  };

  const handleSearch = () => {
    setPage(1);
    setSelected([]); // Clear selections on search
    // fetchData will be automatically triggered by useEffect
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
      } else if (tableType === "Patient Data") {
        response = await deletePatient({ ids: selected });
      } else if (tableType === "Report") {
        response = await deleteReport({ ids: selected });
      } else if (tableType === "Record") {
        response = await deleteRecord({ ids: selected });
      } else if (tableType === "Appointment") {
        response = await deleteAppointment({ ids: selected });
      } else if (tableType === "Roles") {
        response = await deleteAllRoles({ ids: selected });
      } else if (tableType === "User") {
        response = await deleteAllUsers({ ids: selected });
      } else {
        showAlert("error", "Delete not supported for this table");
        return;
      }

      if (response?.status === 200 || response?.success) {
        showAlert("success", response?.message || "Deleted successfully");
        
        // After delete, check if current page is still valid
        const newTotal = totalRecords - selected.length;
        const maxPage = Math.ceil(newTotal / rowsPerPage);
        
        // If current page doesn't exist anymore, go to last available page
        if (page > maxPage && maxPage > 0) {
          setPage(maxPage);
        } else if (newTotal === 0) {
          setPage(1);
        }
        
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
    } else if (tableType === "Patient Data") {
      setPatientModelType("Add");
      setOpenPatientModal(true);
    } else if (tableType === "Report") {
      setReportModelType("Add");
      setOpenReportModal(true);
    } else if (tableType === "User") {
      setUserModelType("Add");
      setOpenUserModal(true);
    } else if (tableType === "Roles") {
      setRolesModelType("Add");
      setOpenRolesModal(true);
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
        <AddUser
          open={openUserModal}
          setOpen={setOpenUserModal}
          Modeltype={userModelType}
          Modeldata={modelData}
          onResponse={handleResponse}
        />
        <AddRoles
          open={openRolesModal}
          setOpen={setOpenRolesModal}
          Modeltype={rolesModelType}
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

              {["Categories", "Record", "Appointment", "Report", "Roles", "User", "Patient Data"].includes(tableType) && (
                <TextField
                  size="small"
                  placeholder="Name..."
                  variant="outlined"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  sx={{
                    minWidth: 200,
                    backgroundColor: "white",
                    borderRadius: 1,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "var(--background-color)" },
                      "&:hover fieldset": { borderColor: "var(--background-color)" },
                      "&.Mui-focused fieldset": { borderColor: "var(--background-color)" },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon
                          onClick={handleSearch}
                          sx={{ cursor: "pointer", color: "var(--background-color)" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              )}

              {selected.length > 0 ? (
                <IconButton onClick={handleDeleteClick} sx={{ color: "rgb(161, 4, 4)" }}>
                  <DeleteIcon />
                </IconButton>
              ) : (
                tableType !== "Comments" && (
                  <Button
                    sx={{
                      background: "linear-gradient(90deg, #8B0000, #B22222)",
                      color: "#fff",
                      borderRadius: "8px",
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
                {/* <TableHead>
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
                    <TableCell sx={{ color: "#B0000" }}>Action</TableCell>
                  </TableRow>
                </TableHead> */}
<TableHead>
  <TableRow
    sx={{
      backgroundColor: "#B22222", // red background
    }}
  >
    <TableCell padding="checkbox"
    sx={{ backgroundColor: "#B22222" }} >
      <Checkbox
        sx={{ color: "white" }}
        
        indeterminate={selected.length > 0 && selected.length < data.length}
        checked={data.length > 0 && selected.length === data.length}
        onChange={handleSelectAllClick}
      />
    </TableCell>

    {attributes.map((attr) => (
      <TableCell
        key={attr.id}
        sx={{
          color: "white",        // white text
          fontWeight: "bold",
          fontSize: "0.95rem",
          background: "#B22222"
        }}
      >
        {attr.label}
      </TableCell>
    ))}

    <TableCell sx={{ color: "white", fontWeight: "bold",background: "#B22222" }}>Action</TableCell>
  </TableRow>
</TableHead>

                <TableBody>
                  {/* 🆕 Loading State */}
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={attributes.length + 2} align="center" sx={{ py: 8 }}>
                        <CircularProgress sx={{ color: "#8B0000" }} />
                        <Typography variant="body1" sx={{ mt: 2, color: "var(--secondary-color)" }}>
                          Loading data...
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : data.length === 0 ? (
                    // 🆕 No Data Found State
                    <TableRow>
                      <TableCell colSpan={attributes.length + 2} align="center" sx={{ py: 8 }}>
                        <Typography variant="h6" sx={{ color: "var(--secondary-color)", mb: 1 }}>
                          {searchQuery ? "No results found" : "No data available"}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "var(--secondary-color)" }}>
                          {searchQuery 
                            ? `No ${tableType.toLowerCase()} found matching "${searchQuery}"`
                            : `No ${tableType.toLowerCase()} available yet`
                          }
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    // 🆕 Data Rows
                    data.map((row) => {
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
                              {/* {["createdAt", "publishedDate", "reportDate", "appointmentDate"].includes(attr.id) ? (
                                formatDate(row[attr.id], "display")
                              ) : attr.id === "published" ? ( */}
                              
                                {/* <span
                                  style={{
                                    color: row[attr.id] ? "var(--success-color)" : "var(--warning-color)",
                                    background: row[attr.id] ? "var(--success-bgcolor)" : "var(--warning-bgcolor)",
                                    padding: "5px 10px",
                                    borderRadius: "4px",
                                    fontWeight: 500,
                                  }}
                                >
                                  {row[attr.id] ? "Public" : "Private"}
                                </span> */}
                                {["createdAt", "publishedDate", "reportDate", "appointmentDate"].includes(attr.id) ? (
  formatDate(row[attr.id], "display")
) : attr.id === "appointmentTime" ? (
  formatetime(row[attr.id])
) : attr.id === "published" ? (
  <span
    style={{
      color: row[attr.id] ? "var(--success-color)" : "var(--warning-color)",
      background: row[attr.id] ? "var(--success-bgcolor)" : "var(--warning-bgcolor)",
      padding: "5px 10px",
      borderRadius: "4px",
      fontWeight: 500,
    }}
  >
    {row[attr.id] ? "Public" : "Private"}
  </span>

                              ) : attr.id === "status" ? (
                                <span
                                  style={{
                                    backgroundColor:
                                      row[attr.id] === true || row[attr.id] === "Active"
                                        ? "rgb(210, 248, 172)"
                                        : row[attr.id] === false || row[attr.id] === "Inactive"
                                        ? "rgb(255, 206, 202)"
                                        : row[attr.id] === "Completed"
                                        ? "rgb(210, 248, 172)"
                                        : row[attr.id] === "Cancelled"
                                        ? "rgb(255, 206, 202)"
                                        : row[attr.id] === "Approved"
                                        ? "rgb(218, 237, 253)"
                                        : row[attr.id] === "Pending"
                                        ? "rgb(250, 227, 187)"
                                        : "#F5F5F5",
                                    color: "inherit",
                                    padding: "6px 12px",
                                    borderRadius: "6px",
                                    fontWeight: 500,
                                    display: "inline-block",
                                    textTransform: "capitalize",
                                    textAlign: "center",
                                    minWidth: "80px",
                                  }}
                                >
                                  {row[attr.id] === true ? "Active" : row[attr.id] === false ? "Inactive" : row[attr.id]}
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
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalRecords}
              rowsPerPage={rowsPerPage}
              page={Math.min(page - 1, Math.max(0, Math.ceil(totalRecords / rowsPerPage) - 1))}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Rows per page:"
              labelDisplayedRows={({ from, to, count }) => {
                // Handle case when there's no data
                if (count === 0) return '0-0 of 0';
                // Normal display
                const displayTo = Math.min(to, count);
                return `${from}-${displayTo} of ${count}`;
              }}
              sx={{
                '.MuiTablePagination-toolbar': {
                  color: 'var(--secondary-color)',
                },
                '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                  marginBottom: 0,
                },
                '.MuiTablePagination-select': {
                  color: '#8B0000',
                },
                '.MuiTablePagination-actions button': {
                  color: '#8B0000',
                  '&:disabled': {
                    color: 'rgba(0, 0, 0, 0.26)',
                  },
                },
              }}
            />
          </Paper>
        </Box>
      </>
    ),
  };
}

export default useTable;