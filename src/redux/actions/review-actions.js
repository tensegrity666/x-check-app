import { ReviewApi } from '../../services/rest-api';
import { actionTypes } from '../constants';
import { receiveApiErrorResponse } from './error-actions';

const { FETCH_REVIEW_BEGIN, FETCH_REVIEW_SUCCESS } = actionTypes;
const api = new ReviewApi();

const fetchReviewBegin = () => ({
  type: FETCH_REVIEW_BEGIN,
});

const fetchReviewSuccess = (reviewData) => ({
  type: FETCH_REVIEW_SUCCESS,
  payload: reviewData,
});

const fetchReviewByRequestId = (reviewRequestId, userId) => async (
  dispatch
) => {
  dispatch(fetchReviewBegin());
  try {
    const result = await api.getReviewByRequest(reviewRequestId);
    const userReview = result.find(({ author }) => author === userId);
    if (userReview) {
      dispatch(fetchReviewSuccess(result));
    }
    dispatch(fetchReviewSuccess({}));
  } catch (error) {
    dispatch(receiveApiErrorResponse(error));
  }
};

export default fetchReviewByRequestId;
