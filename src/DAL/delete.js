import { invokeApi } from "../Utils/InvokeApi";


export const deleteAllCategories = async (ids) => {
  const reqObj = {
    path: ``,
    method: "DELETE", // Ensure correct capitalization
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: {ids},
  };
  
  return invokeApi(reqObj);
};
// export const deleteRecord = async (ids) => {
//   const reqObj = {
//     path: `/patients/delete`,
//     method: "DELETE", // Ensure correct capitalization
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("Token")}`,
//     },
//     postData: {ids},
//   };
  
//   return invokeApi(reqObj);
// };
export const deletePatient = async (data) => {
  const reqObj = {
    path: `/patients/delete`,   // matches router.delete("/delete")
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,             // data should be { ids: [...] }
  };

  return invokeApi(reqObj);
};
export const deleteRecord = async (data) => {
  const reqObj = {
    path: `/record/delete`,   // matches router.delete("/delete")
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,             // data should be { ids: [...] }
  };

  return invokeApi(reqObj);
};
export const deleteReport = async (data) => {
  const reqObj = {
    path: `/report/delete`,   // matches router.delete("/delete")
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,             // data should be { ids: [...] }
  };

  return invokeApi(reqObj);
};
export const deleteAppointment = async (data) => {
  const reqObj = {
    path: `/appointment/delete`,   // matches router.delete("/delete")
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,             // data should be { ids: [...] }
  };

  return invokeApi(reqObj);
};