import { SET_CURRENT_DEPARTMENT, TOGGLE_FORM } from './actions';

const initialState = {
  currentDepartment: 'Oncology',
  showLeftForm: true,
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_DEPARTMENT:
      return {
        ...state,
        currentDepartment: action.payload,
      };
    case TOGGLE_FORM:
      return {
        ...state,
        showLeftForm: action.payload,
      };
    default:
      return state;
  }
};

export default formReducer;
