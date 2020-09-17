import { actionTypes } from '../constants';

const {
  FETCH_REVIEW_REQUESTS_BEGIN,
  FETCH_REVIEW_REQUESTS_SUCCESS,
} = actionTypes;

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

export { fetchReviewRequestsBegin, fetchReviewRequestsSuccess };
