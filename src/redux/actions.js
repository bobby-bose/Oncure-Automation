// Define action types
export const SET_CURRENT_DEPARTMENT = 'SET_CURRENT_DEPARTMENT';
export const TOGGLE_FORM = 'TOGGLE_FORM';
export const SET_CURRENT_PATIENT = 'SET_CURRENT_PATIENT';

// Define action creators
export const setCurrentDepartment = (department) => ({
  type: SET_CURRENT_DEPARTMENT,
  payload: department,
});

export const toggleForm = (showLeftForm) => ({
  type: TOGGLE_FORM,
  payload: showLeftForm,
});

export const setCurrentPatient = (patient) => ({
  type: SET_CURRENT_PATIENT,
  payload: patient,
});
