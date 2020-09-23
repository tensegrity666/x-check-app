import React, { useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, PageHeader } from 'antd';

import * as actions from '../../redux/actions';
import store from '../../redux/store';

const Review = () => {
  const { search } = useLocation();
  const history = useHistory();
  const reviewRequests = useSelector(
    ({ reviewRequestsReducer }) => reviewRequestsReducer.reviewRequests
  );
  const currentReviewRequest = useSelector(
    ({ reviewRequestsReducer }) => reviewRequestsReducer.currentReviewRequest
  );

  const { dispatch } = store;
  const { fetchReviewRequestById, setReviewRequest } = bindActionCreators(
    actions,
    dispatch
  );
  const onFetchReviewRequest = useCallback(fetchReviewRequestById, []);
  const onSetReviewRequest = useCallback(setReviewRequest, []);

  const { Content } = Layout;

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

  return (
    <Layout>
      <PageHeader onBack={history.goBack} title="Review" />
      <Content>{currentReviewRequest.id}</Content>
    </Layout>
  );
};

export default Review;
