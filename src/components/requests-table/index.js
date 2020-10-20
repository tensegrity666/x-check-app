import React, { useCallback, useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector } from 'react-redux';

import store from '../../redux/store';
import * as actions from '../../redux/actions';

import RequestsContainer from './requests-container';

const ReviewRequests = () => {
  const [requestsForUser, setRequestsForUser] = useState([]);

  const reviewRequests = useSelector(
    ({ reviewRequestsReducer }) => reviewRequestsReducer.reviewRequests
  );
  const userGithubId = useSelector(({ loginReducer }) => loginReducer.githubId);
  const students = useSelector(
    ({ crossCheckSessionReducer }) => crossCheckSessionReducer.userStudents
  );

  const { dispatch } = store;
  const {
    fetchReviewRequests,
    fetchSessionAttendeesByReviewer,
  } = bindActionCreators(actions, dispatch);
  const onFetchReviewRequests = useCallback(fetchReviewRequests, []);
  const onFetchAttendeesByUser = useCallback(
    fetchSessionAttendeesByReviewer,
    []
  );

  useEffect(() => {
    onFetchReviewRequests();
    onFetchAttendeesByUser(
      'rss2020Q3react-xcheck',
      'ButterBrot777' || userGithubId
    );
  }, [userGithubId, onFetchReviewRequests, onFetchAttendeesByUser]);

  useEffect(() => {
    if (students.length > 0 && reviewRequests.length > 0) {
      const requests = reviewRequests.filter(({ author }) =>
        students.includes(author)
      );
      setRequestsForUser(requests);
    }
  }, [students, reviewRequests]);

  return (
    <RequestsContainer
      userId={userGithubId}
      reviewRequests={reviewRequests}
      requestsForUser={requestsForUser}
    />
  );
};

export default ReviewRequests;
