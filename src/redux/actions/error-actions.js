import { actionTypes } from '../constants';

const { API_ERROR_RESPONSE } = actionTypes;

const receiveApiErrorResponse = (error) => ({
  type: API_ERROR_RESPONSE,
  payload: error,
});

export default receiveApiErrorResponse;
