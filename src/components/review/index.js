import React, { useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, PageHeader } from 'antd';

import * as actions from '../../redux/actions';
import store from '../../redux/store';
import ReviewForm from './review-form';

import mockReviewRequest from './mockReviewRequest.json';
import mockReview from './mockReview.json';

const Review = () => {
  const { search } = useLocation();
  const history = useHistory();
  const reviewRequests = useSelector(
    ({ reviewRequestsReducer }) => reviewRequestsReducer.reviewRequests
  );
  const currentReviewRequest = useSelector(
    ({ reviewRequestsReducer }) => reviewRequestsReducer.currentReviewRequest
  );
  const userId = useSelector(({ loginReducer }) => loginReducer.githubId);
  const review = useSelector(
    ({ reviewReducer }) => reviewReducer.review,
    shallowEqual
  );

  const { dispatch } = store;
  const {
    fetchReviewRequestById,
    setReviewRequest,
    fetchReviewByRequestId,
  } = bindActionCreators(actions, dispatch);
  const onFetchReviewRequest = useCallback(fetchReviewRequestById, []);
  const onSetReviewRequest = useCallback(setReviewRequest, []);
  const onFetchReviewByRequest = useCallback(fetchReviewByRequestId, []);

  useEffect(() => {
    const searchParam = new URLSearchParams(search).get('request');

    if (searchParam && reviewRequests.length > 0) {
      const reviewRequest = reviewRequests.find(({ id }) => id === searchParam);
      onSetReviewRequest(reviewRequest);
    } else if (searchParam) {
      onFetchReviewRequest(searchParam);
    }

    return () => {
      onSetReviewRequest({});
    };
  }, [search, reviewRequests, onFetchReviewRequest, onSetReviewRequest]);

  useEffect(() => {
    const searchParam = new URLSearchParams(search).get('request');
    if (searchParam) {
      onFetchReviewByRequest(searchParam, userId);
    }
    if (currentReviewRequest) {
      onFetchReviewByRequest(currentReviewRequest.id, userId);
    }
  }, [search, userId, currentReviewRequest, onFetchReviewByRequest]);

  const { Content } = Layout;

  return (
    <Layout>
      <PageHeader onBack={history.goBack} title="Review" />
      <Content>
        <ReviewForm
          reviewRequest={
            Object.keys(currentReviewRequest).length === 0
              ? mockReviewRequest
              : currentReviewRequest
          }
          review={Object.keys(review).length === 0 ? mockReview : review}
          userId={userId}
        />
      </Content>
    </Layout>
  );
};

export default Review;
