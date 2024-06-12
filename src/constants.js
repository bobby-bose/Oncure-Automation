// constants.js
const API_BASE_URL = 'http://127.0.0.1:8000'; // Replace with your API base URL

export const API_ENDPOINTS = {
  PATIENTS_LIST: `${API_BASE_URL}/api/patients/`,
  PATIENT_DETAIL: `${API_BASE_URL}/api/patients/{{id}}/`,
  ADD_PATIENT: `${API_BASE_URL}/api/patients/add/`,
  UPDATE_PATIENT: `${API_BASE_URL}/api/patients/update/{{id}}/`,
  DELETE_PATIENT: `${API_BASE_URL}/api/patients/delete/{{id}}/`,
  PACKAGES_LIST: 'http://127.0.0.1:8000/api/packages/list/',
  
  COORDINATIONFACILITATOR_LIST: 'http://127.0.0.1:8000/api/coordinationfacilitator/list/',
MEALS_LIST: 'http://127.0.0.1:8000/api/meals/list/',
};
