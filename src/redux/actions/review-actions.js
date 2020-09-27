import { ReviewApi } from '../../services/rest-api';
import { actionTypes } from '../constants';
import { receiveApiErrorResponse } from './error-actions';

const {
  FETCH_REVIEW_BEGIN,
  REVIEW_EFFECT_BEGIN,
  FETCH_REVIEW_SUCCESS,
} = actionTypes;
const api = new ReviewApi();

const fetchReviewBegin = () => ({
  type: FETCH_REVIEW_BEGIN,
});

const startReviewEffect = () => ({
  type: REVIEW_EFFECT_BEGIN,
});

const fetchReviewSuccess = (reviewData) => ({
  type: FETCH_REVIEW_SUCCESS,
  payload: reviewData,
});

export const fetchReviewByRequestId = (reviewRequestId, userId) => async (
  dispatch
) => {
  try {
    dispatch(fetchReviewBegin());
    const result = await api.getReviewByRequest(reviewRequestId);
    const userReview = result.find(({ author }) => author === userId);
    if (userReview) {
      return dispatch(fetchReviewSuccess(userReview));
    }
    return dispatch(fetchReviewSuccess({}));
  } catch (error) {
    return dispatch(receiveApiErrorResponse(error.message));
  }
};

export const createReview = (requestId, authorId, gradeItems) => async (
  dispatch
) => {
  const data = {
    author: authorId,
    grade: [...gradeItems],
    requestId,
  };
  const body = {
    githubId: authorId,
    data,
  };
  try {
    dispatch(startReviewEffect());
    const result = await api.createReview(body);
    if (result.id) {
      return dispatch(fetchReviewSuccess(result));
    }
    return dispatch(receiveApiErrorResponse(result.message));
  } catch (error) {
    return dispatch(receiveApiErrorResponse(error.message));
  }
};

export const editReview = (authorId, reviewId, gradeItems) => async (
  dispatch
) => {
  const body = {
    githubId: authorId,
    reviewId,
    data: {
      grade: [...gradeItems],
    },
  };
  try {
    dispatch(startReviewEffect());
    const result = await api.editReview(body);
    if (result.error) {
      return dispatch(receiveApiErrorResponse(result.message));
    }
    return dispatch(fetchReviewSuccess(result));
  } catch (error) {
    return dispatch(receiveApiErrorResponse(error.message));
  }
};

export const toggleReviewStatus = (userId, reviewId, requiredState) => async (
  dispatch
) => {
  const body = {
    githubId: userId,
    reviewId,
    requiredState,
  };
  try {
    dispatch(startReviewEffect());
    const result = await api.toggleReviewState(body);
    if (result.error) {
      return dispatch(receiveApiErrorResponse(result.message));
    }
    return dispatch(fetchReviewSuccess(result));
  } catch (error) {
    return dispatch(receiveApiErrorResponse(error.message));
  }
};
