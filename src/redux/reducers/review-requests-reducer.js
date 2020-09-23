import { actionTypes } from '../constants';

const initialState = {
  reviewRequests: [],
  currentReviewRequest: {},
  isLoading: false,
};

const reviewRequestsReducer = (state = initialState, { type, payload }) => {
  const {
    FETCH_REVIEW_REQUESTS_SUCCESS,
    FETCH_REVIEW_REQUESTS_BEGIN,
    FETCH_REVIEW_REQUEST,
    SET_REVIEW_REQUEST,
  } = actionTypes;
  switch (type) {
    case FETCH_REVIEW_REQUESTS_BEGIN:
      return { ...state, isLoading: true };
    case FETCH_REVIEW_REQUESTS_SUCCESS:
      return { ...state, reviewRequests: [...payload], isLoading: false };
    case FETCH_REVIEW_REQUEST:
    case SET_REVIEW_REQUEST:
      return {
        ...state,
        currentReviewRequest: { ...payload },
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reviewRequestsReducer;
