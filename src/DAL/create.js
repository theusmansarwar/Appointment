// import { invokeApi } from "../Utils/InvokeApi";

// export const createnewCategory = async (data) => {

//   const reqObj = {
//     path: "/",
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("Token")}`,
//     },
//     postData: data,
//   };
//   return invokeApi(reqObj);
// };
// <<<<<<< HEAD
// export const createPatient = async (data) => {

//   const reqObj = {
//     path: "/patients/create",
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("Token")}`,
//     },
//     postData: data,
//   };
//   return invokeApi(reqObj);
// };
// export const createRecord = async (data) => {

//   const reqObj = {
//     path: "/record/create",
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("Token")}`,
//     },
//     postData: data,
//   };
//   return invokeApi(reqObj);
// };
// export const createReport = async (data) => {

//   const reqObj = {
//     path: "/report/create",
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("Token")}`,
//     },
//     postData: data,
//   };
//   return invokeApi(reqObj);
// };
// export const createAppointment = async (data) => {

//   const reqObj = {
//     path: "/appointment/create",
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("Token")}`,
//     },
//     postData: data,
//   };
//   return invokeApi(reqObj);
// };
// =======
// >>>>>>> 109c5ad261df44b694cde745048932f8fe2fed6c
import { invokeApi } from "../Utils/InvokeApi";

// Create new category
export const createnewCategory = async (data) => {
  const reqObj = {
    path: "/",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};

// Create patient
export const createPatient = async (data) => {
  const reqObj = {
    path: "/patients/create",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};

// Create record
export const createRecord = async (data) => {
  const reqObj = {
    path: "/record/create",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const createRecordDetail = async (data) => {
  const reqObj = {
    path: "/recorddetail/create",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};


// Create report
export const createReport = async (data) => {
  const reqObj = {
    path: "/report/create",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};

// Create appointment
export const createAppointment = async (data) => {
  const reqObj = {
    path: "/appointment/create",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const createRecordVisit = async (recordId, data) => {
  const reqObj = {
    path: `/records/${recordId}/visits`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};