

import { invokeApi } from "../Utils/InvokeApi";

// Delete all categories
export const deleteAllCategories = async (data) => {
  const reqObj = {
    path: ``,
    method: "DELETE", // Ensure correct capitalization
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data, // data should be { ids: [...] }
  };

  return invokeApi(reqObj);
};

// Delete patient
export const deletePatient = async (data) => {
  const reqObj = {
    path: `/patients/delete`, // matches router.delete("/delete")
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data, // data should be { ids: [...] }
  };

  return invokeApi(reqObj);
};

// Delete record
export const deleteRecord = async (data) => {
  const reqObj = {
    path: `/record/delete`, // matches router.delete("/delete")
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data, // data should be { ids: [...] }
  };

  return invokeApi(reqObj);
};

// Delete report
export const deleteReport = async (data) => {
  const reqObj = {
    path: `/report/delete`, // matches router.delete("/delete")
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data, // data should be { ids: [...] }
  };

  return invokeApi(reqObj);
};

// Delete appointment
export const deleteAppointment = async (data) => {
  const reqObj = {
    path: `/appointment/delete`, // matches router.delete("/delete")
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data, // data should be { ids: [...] }
  };

  return invokeApi(reqObj);
};
export const deleteRecordVisit = async (recordId, visitId) => {
  const reqObj = {
    path: `/records/${recordId}/visits/${visitId}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  };
  return invokeApi(reqObj);
};
export const deleteAllUsers = async (data) => {
  const reqObj = {
    path: `/user/multipleDelete`,
    method: "DELETE", // Ensure correct capitalization
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const deleteAllRoles = async (data) => {
  const reqObj = {
    path: `/roles/multipleDelete`,
    method: "DELETE", // Ensure correct capitalization
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};