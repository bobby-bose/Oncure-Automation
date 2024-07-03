const API_BASE_URL = 'http://3.87.204.95:8000/'; // Replace with your API base URL

export const API_ENDPOINTS = {
  PATIENTS_LIST: `${API_BASE_URL}/api/patients/`,
  PATIENT_DETAIL: `${API_BASE_URL}/api/patients/{{id}}/`,
  ADD_PATIENT: `${API_BASE_URL}/api/patients/add/`,
  UPDATE_PATIENT: `${API_BASE_URL}/api/patients/update/{{id}}/`,
  DELETE_PATIENT: `${API_BASE_URL}/api/patients/delete/{{id}}/`,
  PACKAGES_LIST: `${API_BASE_URL}/api/packages/list/`,
  COORDINATIONFACILITATOR_LIST: `${API_BASE_URL}/api/coordinationfacilitator/list/`,
MEALS_LIST: `${API_BASE_URL}/api/meals/list/`,
FETCH_CARD_DETAILS: `${API_BASE_URL}/api/patient-card-details/`,
UPDATE_SET_TIMER:`${API_BASE_URL}/api/updatesettimer/`,
PATIENT_DETAILS:`${API_BASE_URL}/api/patient/details/`,
PATIENT_ADD:`${API_BASE_URL}/api/patients/add/`,
PATIENT_DELETE:`${API_BASE_URL}/api/patients/delete/`,
PATIENT_EDIT:`${API_BASE_URL}/api/patients/edit/`,
UPDATE_NEXT_DEPARTMENT:`${API_BASE_URL}/api/update_next_department/`,
START_TIMER:`${API_BASE_URL}/api/start_timer/`,
UPDATE_TIMER:`${API_BASE_URL}/api/update_timer/`,
PAUSE_TIMER:`${API_BASE_URL}/api/pause_timer/`,
FULL_TIMER:`${API_BASE_URL}/api/fulltimer/`,
};
