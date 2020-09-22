import React, { useCallback, useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector } from 'react-redux';

import store from '../../redux/store';
import * as actions from '../../redux/actions';

import RequestsTable from './requests-table';

const ReviewRequests = () => {
  const [requestForUser, setRequestsForUser] = useState([]);

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
    <div>
      <RequestsTable
        reviewRequests={requestForUser}
        userId={userGithubId}
        title="Review Requests You Need to Review"
      />
      <RequestsTable
        reviewRequests={reviewRequests}
        userId={userGithubId}
        title="All Review Requests"
      />
    </div>
  );
};

export default ReviewRequests;
