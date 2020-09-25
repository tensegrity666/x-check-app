import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { Layout, PageHeader } from 'antd';

import {
  fetchReviewRequestById,
  setReviewRequest,
  fetchReviewByRequestId,
  fetchTaskById,
} from '../../redux/actions';
import store from '../../redux/store';
import ReviewForm from './review-form';
import styles from './index.module.css';

import mockReviewRequest from './mockReviewRequest.json';
import mockReview from './mockReview.json';
import mockTask from './mockTask.json';

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
  const currentTask = useSelector(
    ({ tasksListReducer }) => tasksListReducer.currentTask,
    shallowEqual
  );
  const { dispatch } = store;

  useEffect(() => {
    const searchParam = new URLSearchParams(search).get('request');

    if (searchParam && reviewRequests.length > 0) {
      const reviewRequest = reviewRequests.find(({ id }) => id === searchParam);
      dispatch(setReviewRequest(reviewRequest));
    } else if (searchParam) {
      dispatch(fetchReviewRequestById(searchParam));
    }

    return () => {
      dispatch(setReviewRequest({}));
    };
  }, [search, reviewRequests, dispatch]);

  useEffect(() => {
    const searchParam = new URLSearchParams(search).get('request');
    if (searchParam) {
      dispatch(fetchReviewByRequestId(searchParam, userId));
    }
    if (currentReviewRequest.id) {
      dispatch(fetchReviewByRequestId(currentReviewRequest.id, userId));
    }
  }, [search, userId, currentReviewRequest, dispatch]);

  useEffect(() => {
    if (currentReviewRequest.task) {
      dispatch(fetchTaskById(currentReviewRequest.task));
    }
  }, [currentReviewRequest, dispatch]);

  const { Content } = Layout;

  return (
    <Layout className={styles.wrapper}>
      <PageHeader onBack={history.goBack} title="Review" />
      <Content>
        <ReviewForm
          reviewRequest={
            Object.keys(currentReviewRequest).length === 0
              ? mockReviewRequest
              : currentReviewRequest
          }
          review={Object.keys(review).length === 0 ? mockReview : review}
          task={currentTask.items ? currentTask : mockTask}
          userId={userId}
        />
      </Content>
    </Layout>
  );
};

export default Review;
