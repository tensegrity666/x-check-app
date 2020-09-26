import { actionTypes } from '../constants';
import { RevReqApi } from '../../services/rest-api';
import { receiveApiErrorResponse } from './error-actions';

const {
  FETCH_REVIEW_REQUESTS_BEGIN,
  FETCH_REVIEW_REQUESTS_SUCCESS,
  FETCH_REVIEW_REQUEST_SUCCESS,
  SET_REVIEW_REQUEST,
} = actionTypes;
const api = new RevReqApi();

const fetchReviewRequestsBegin = () => {
  return {
    type: FETCH_REVIEW_REQUESTS_BEGIN,
  };
};

const fetchReviewRequestsSuccess = (reviewRequests) => {
  return {
    type: FETCH_REVIEW_REQUESTS_SUCCESS,
    payload: reviewRequests,
  };
};

const fetchReviewRequestSuccess = (reviewRequest) => {
  return {
    type: FETCH_REVIEW_REQUEST_SUCCESS,
    payload: reviewRequest,
  };
};

const setReviewRequest = (reviewRequest) => {
  return {
    type: SET_REVIEW_REQUEST,
    payload: reviewRequest,
  };
};

const fetchReviewRequestById = (reviewRequestId) => async (dispatch) => {
  try {
    dispatch(fetchReviewRequestsBegin());
    const [result] = await api.getRevReq(reviewRequestId);
    dispatch(fetchReviewRequestSuccess(result));
  } catch (error) {
    dispatch(receiveApiErrorResponse(error));
  }
};

const fetchReviewRequests = () => (dispatch) => {
  dispatch(fetchReviewRequestsBegin());
  api
    .getRevReqAll()
    .then((result) => dispatch(fetchReviewRequestsSuccess(result)))
    .catch((result) => dispatch(receiveApiErrorResponse(result)));
};

export {
  fetchReviewRequestsSuccess,
  fetchReviewRequests,
  setReviewRequest,
  fetchReviewRequestById,
};
