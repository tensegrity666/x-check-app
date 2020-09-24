import { actionTypes } from '../constants';

const { API_ERROR_RESPONSE } = actionTypes;

const initialState = {
  api: null,
};

const errorReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case API_ERROR_RESPONSE:
      return { ...state, api: payload };

    default:
      return state;
  }
};

export default errorReducer;
