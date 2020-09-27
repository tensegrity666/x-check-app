import { actionTypes } from '../constants';

const initialState = {
  isLoading: false,
  review: {},
};

const reviewReducer = (state = initialState, { type, payload }) => {
  const {
    FETCH_REVIEW_BEGIN,
    REVIEW_EFFECT_BEGIN,
    FETCH_REVIEW_SUCCESS,
  } = actionTypes;
  switch (type) {
    case FETCH_REVIEW_BEGIN:
    case REVIEW_EFFECT_BEGIN:
      return { ...state, isLoading: true };
    case FETCH_REVIEW_SUCCESS:
      return { ...state, review: { ...payload }, isLoading: false };

    default:
      return state;
  }
};

export default reviewReducer;
