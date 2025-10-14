 import { invokeApi } from "../Utils/InvokeApi";

export const fetchcategorylist = async () => {
  const reqObj = {
    path: "/category/live",
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: {},
  };
  return invokeApi(reqObj);
};

export const fetchDashboard = async () => {
  const reqObj = {
    path: "/admin/stats",
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: {},
  };
  return invokeApi(reqObj);
};

export const fetchDashboardChart = async () => {
  const reqObj = {
    path: "/views/get/count",
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: {},
  };
  return invokeApi(reqObj);
};

export const fetchallcategorylist = async (page, rowsPerPages) => {
  const reqObj = {
    path: `/category/view?limit=${rowsPerPages}&page=${page}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    body: {},
  };
  return invokeApi(reqObj);
};

// ✅ Added functions
export const fetchPatients = async (name) => {
  const reqObj = {
    path: `/patients/${name}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    body: {},
  };
  return invokeApi(reqObj);
};

export const fetchRecord = async (patientName) => {
  const reqObj = {
    path: `/record/${patientName}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    body: {},
  };
  return invokeApi(reqObj);
};

export const fetchReport = async (reportDate) => {
  const reqObj = {
    path: `/report/${reportDate}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    body: {},
  };
  return invokeApi(reqObj);
};

export const fetchAppointment = async (patientName) => {
  const reqObj = {
    path: `/appointment/${patientName}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    body: {},
  };
  return invokeApi(reqObj);
};

export const fetchallAppointmentlist = async (page, rowsPerPages,search = "") => {
  const reqObj = {
    path: `/appointment/view?limit=${rowsPerPages}&page=${page}&search=${encodeURIComponent(search)}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    body: {},
  };
  return invokeApi(reqObj);
};
export const fetchallRecordlist = async (page, rowsPerPages,search = "") => {
  const reqObj = {
    path: `/record/view?limit=${rowsPerPages}&page=${page}&search=${encodeURIComponent(search)}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    body: {},
  };
  return invokeApi(reqObj);
};
export const fetchallReportlist = async (page, rowsPerPages,search = "") => {
  const reqObj = {
    path: `/report/view?limit=${rowsPerPages}&page=${page}&search=${encodeURIComponent(search)}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    body: {},
  };
  return invokeApi(reqObj);
};

export const fetchRecordById = async (recordId) => {
  const reqObj = {
    path: `/record/${recordId}`, // ✅ calls backend
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  };
  return invokeApi(reqObj);
};


// export const fetchallPatientslist = async (page, rowsPerPages, search = "") => {
//   const reqObj = {
//     path: `/patients/view?limit=${rowsPerPages}&page=${page}`,
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("Token")}`,
//     },
//     body: {},
//   };
//   return invokeApi(reqObj);
// };
export const fetchallPatientslist = async (page, rowsPerPages, search = "") => {
  const reqObj = {
    path: `/patients/view?limit=${rowsPerPages}&page=${page}&search=${encodeURIComponent(search)}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  };
  return invokeApi(reqObj);
};
export const fetchRecordVisits = async (recordId) => {
  const reqObj = {
    path: `/records/${recordId}/visits`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  };
  return invokeApi(reqObj);
};