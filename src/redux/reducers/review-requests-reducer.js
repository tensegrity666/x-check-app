import { actionTypes } from '../constants';

const initialState = {
  reviewRequests: [],
  isLoading: false,
};

const reviewRequestsReducer = (state = initialState, { type, payload }) => {
  const {
    FETCH_REVIEW_REQUESTS_SUCCESS,
    FETCH_REVIEW_REQUESTS_BEGIN,
  } = actionTypes;
  switch (type) {
    case FETCH_REVIEW_REQUESTS_BEGIN:
      return { ...state, isLoading: true };
    case FETCH_REVIEW_REQUESTS_SUCCESS:
      return { ...state, reviewRequests: [...payload], isLoading: false };
    default:
      return state;
  }
};

export default reviewRequestsReducer;
