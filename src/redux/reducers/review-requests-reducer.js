import { actionTypes } from '../constants';

const initialState = {
  reviewRequests: [],
};

const reviewRequestsReducer = (state = initialState, { type, payload }) => {
  const { FETCH_REVIEW_REQUESTS } = actionTypes;
  switch (type) {
    case FETCH_REVIEW_REQUESTS:
      return { ...state, reviewRequests: [...payload] };
    default:
      return state;
  }
};

export default reviewRequestsReducer;
