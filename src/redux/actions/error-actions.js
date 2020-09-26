import { actionTypes } from '../constants';

const { API_ERROR_RESPONSE, APP_ERROR } = actionTypes;

const receiveApiErrorResponse = (error) => ({
  type: API_ERROR_RESPONSE,
  payload: error,
});

const handleAppError = (error) => ({
  type: APP_ERROR,
  payload: error,
});

export { receiveApiErrorResponse, handleAppError };
