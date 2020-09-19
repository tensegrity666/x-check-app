import { actionTypes } from '../constants';

const { FETCH_TASKS_REQUEST, FETCH_TASKS_SUCCESS } = actionTypes;

const initialState = {
  tasks: [],
  isLoading: false,
};

const tasksListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_TASKS_REQUEST:
      return { ...state, isLoading: true };

    case FETCH_TASKS_SUCCESS:
      return { ...state, tasks: [...payload], isLoading: false };

    default:
      return state;
  }
};

export default tasksListReducer;
