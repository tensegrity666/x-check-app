import { actionTypes } from '../constants';

const { FETCH_STUDENTS_BY_REVIEWER } = actionTypes;

const initialState = {
  userStudents: [],
};

const crossCheckSessionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_STUDENTS_BY_REVIEWER:
      return { ...state, userStudents: [...payload] };

    default:
      return state;
  }
};

export default crossCheckSessionReducer;
