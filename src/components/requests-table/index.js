import React, { useCallback, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector } from 'react-redux';

import store from '../../redux/store';
import * as actions from '../../redux/actions';

import RequestsTable from './requests-table';

const ReviewRequests = () => {
  const reviewRequests = useSelector(
    ({ reviewRequestsReducer }) => reviewRequestsReducer.reviewRequests
  );

  const { dispatch } = store;
  const { fetchReviewRequests } = bindActionCreators(actions, dispatch);
  const onFetchReviewRequests = useCallback(fetchReviewRequests, []);

  useEffect(() => {
    onFetchReviewRequests();
  }, [onFetchReviewRequests]);

  return (
    <div>
      <RequestsTable reviewRequests={reviewRequests} />
    </div>
  );
};

export default ReviewRequests;
