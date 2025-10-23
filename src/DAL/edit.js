import { invokeApi } from "../Utils/InvokeApi";

export const updateCategory = async (id, data) => {
  const reqObj = {
    path: `/category/update/${id}`, // ✅ Added path
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};

export const updatePatient = async (id, data) => {
  const reqObj = {
    path: `/patients/update/${id}`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};

export const updateRecord = async (id, data) => {
  const reqObj = {
    path: `/record/update/${id}`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};

export const updateReport = async (id, data) => {
  const reqObj = {
    path: `/report/update/${id}`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};

export const updateAppointment = async (id, data) => {
  const reqObj = {
    path: `/appointment/update/${id}`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateRecordVisit = async (recordId, visitId, data) => {
  const reqObj = {
    path: `/records/${recordId}/visits/${visitId}`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateRole = async (id,data) => {
  const reqObj = {
    path: `/roles/update/${id}`,
    method: "PUT",
    headers: {      Authorization: `Bearer ${localStorage.getItem("Token")}`,},
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateUser = async (id,data) => {
  const reqObj = {
    path: `/user/update/${id}`,
    method: "PUT",
    headers: {      Authorization: `Bearer ${localStorage.getItem("Token")}`,},
    postData: data,
  };
  return invokeApi(reqObj);
};
