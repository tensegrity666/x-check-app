import { actionTypes } from '../constants';
import { RevReqApi } from '../../services/rest-api';

const {
  FETCH_REVIEW_REQUESTS_BEGIN,
  FETCH_REVIEW_REQUESTS_SUCCESS,
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

const fetchReviewRequests = () => (dispatch) => {
  dispatch(fetchReviewRequestsBegin());
  api
    .getRevReqAll()
    .then((result) => dispatch(fetchReviewRequestsSuccess(result)));
};

export {
  fetchReviewRequestsBegin,
  fetchReviewRequestsSuccess,
  fetchReviewRequests,
};
