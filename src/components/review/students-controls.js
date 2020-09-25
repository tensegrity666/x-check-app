import React from 'react';
import PropTypes from 'prop-types';
import { Space, Button } from 'antd';

import { REVIEW_STATE } from './constants';
import { actionReviewList as modify } from '../../services/rest-api/constants';

const StudentsControls = ({
  reviewStatus,
  onDisputeReview,
  toggleReviewStatus,
  editReview,
}) => {
  const handleReviewDispute = async () => {
    onDisputeReview();
    await toggleReviewStatus(modify.PUBLISHED_TO_DISPUTED);
  };

  if (
    reviewStatus === REVIEW_STATE.DRAFT ||
    reviewStatus === REVIEW_STATE.ACCEPTED
  )
    return null;

  if (reviewStatus === REVIEW_STATE.PUBLISHED) {
    return (
      <Space>
        <Button danger onClick={handleReviewDispute}>
          Dispute
        </Button>
        <Button
          onClick={() => toggleReviewStatus(modify.PUBLISHED_TO_DISPUTED)}>
          Accept
        </Button>
      </Space>
    );
  }

  if (reviewStatus === REVIEW_STATE.DISPUTED) {
    return (
      <Space>
        <Button onClick={editReview}>Save</Button>
        <Button onCLick={() => toggleReviewStatus(modify.DISPUTED_TO_ACCEPTED)}>
          Accept
        </Button>
      </Space>
    );
  }

  return null;
};

StudentsControls.propTypes = {
  reviewStatus: PropTypes.string.isRequired,
  onDisputeReview: PropTypes.func.isRequired,
  toggleReviewStatus: PropTypes.func.isRequired,
  editReview: PropTypes.func.isRequired,
};

export default StudentsControls;
