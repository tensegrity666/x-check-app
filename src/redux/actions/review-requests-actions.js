import { actionTypes } from '../constants';
import { RevReqApi } from '../../services/rest-api';
import receiveErrorResponse from './error-actions';

const {
  FETCH_REVIEW_REQUESTS_BEGIN,
  FETCH_REVIEW_REQUESTS_SUCCESS,
  FETCH_REVIEW_REQUEST,
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
    type: FETCH_REVIEW_REQUEST,
    payload: reviewRequest,
  };
};

const setReviewRequest = (reviewRequest) => {
  return {
    type: SET_REVIEW_REQUEST,
    payload: reviewRequest,
  };
};

const fetchReviewRequestById = (reviewRequestId) => (dispatch) => {
  dispatch(fetchReviewRequestsBegin());
  api
    .getRevReq(reviewRequestId)
    .then((result) => dispatch(fetchReviewRequestSuccess(result)))
    .catch((result) => dispatch(receiveErrorResponse(result)));
};

const fetchReviewRequests = () => (dispatch) => {
  dispatch(fetchReviewRequestsBegin());
  api
    .getRevReqAll()
    .then((result) => dispatch(fetchReviewRequestsSuccess(result)))
    .catch((result) => dispatch(receiveErrorResponse(result)));
};

export {
  fetchReviewRequestsSuccess,
  fetchReviewRequests,
  setReviewRequest,
  fetchReviewRequestById,
};
