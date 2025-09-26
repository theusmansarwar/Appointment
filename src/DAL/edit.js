import { invokeApi } from "../Utils/InvokeApi";


export const updateCategory = async (id,data) => {
 
  const reqObj = {
    path: ``,
    method: "PUT",
    headers: {      Authorization: `Bearer ${localStorage.getItem("Token")}`,},
    postData: data,
  };
  return invokeApi(reqObj);
};
<<<<<<< HEAD
export const updatePatient = async (id,data) => {
 
  const reqObj = {
    path: `/patients/update/${id}`,
    method: "PUT",
    headers: {      Authorization: `Bearer ${localStorage.getItem("Token")}`,},
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateRecord = async (id,data) => {
 
  const reqObj = {
    path: `/record/update/${id}`,
    method: "PUT",
    headers: {      Authorization: `Bearer ${localStorage.getItem("Token")}`,},
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateReport = async (id,data) => {
 
  const reqObj = {
    path: `/report/update/${id}`,
    method: "PUT",
    headers: {      Authorization: `Bearer ${localStorage.getItem("Token")}`,},
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateAppointment = async (id,data) => {
 
  const reqObj = {
    path: `/appointment/update/${id}`,
    method: "PUT",
    headers: {      Authorization: `Bearer ${localStorage.getItem("Token")}`,},
    postData: data,
  };
  return invokeApi(reqObj);
};
=======
>>>>>>> 109c5ad261df44b694cde745048932f8fe2fed6c
