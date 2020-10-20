import { actionTypes } from '../constants';

const { API_ERROR_RESPONSE, APP_ERROR } = actionTypes;

const initialState = {
  api: null,
  appError: null,
};

const errorReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case API_ERROR_RESPONSE:
      return { ...state, api: payload };

    case APP_ERROR:
      return { ...state, appError: payload };

    default:
      return state;
  }
};

export default errorReducer;
