import { actionTypes } from '../constants';

const { FETCH_REVIEW_REQUESTS } = actionTypes;

const fetchReviewRequestsSuccess = (reviewRequests) => {
  return {
    type: FETCH_REVIEW_REQUESTS,
    payload: reviewRequests,
  };
};

export default fetchReviewRequestsSuccess;
