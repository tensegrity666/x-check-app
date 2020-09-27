import React from 'react';
import PropTypes from 'prop-types';
import { Space, Button } from 'antd';

import { REVIEW_STATE } from './constants';
import { actionReviewList as modify } from '../../services/rest-api/constants';

const StudentsControls = ({
  reviewStatus,
  toggleReviewStatus,
  editReview,
  isDisabled,
}) => {
  const handleReviewDispute = async () => {
    await toggleReviewStatus(modify.PUBLISHED_TO_DISPUTED);
  };

  if (reviewStatus === REVIEW_STATE.PUBLISHED) {
    return (
      <Space size="middle">
        <Button danger onClick={handleReviewDispute} disabled={isDisabled}>
          Dispute
        </Button>
        <Button
          onClick={() => toggleReviewStatus(modify.PUBLISHED_TO_ACCEPTED)}
          disabled={isDisabled}>
          Accept
        </Button>
      </Space>
    );
  }

  if (reviewStatus === REVIEW_STATE.DISPUTED) {
    return (
      <Space size="middle">
        <Button onClick={editReview} disabled={isDisabled}>
          Save
        </Button>
        <Button
          onClick={() => toggleReviewStatus(modify.DISPUTED_TO_ACCEPTED)}
          disabled={isDisabled}>
          Accept
        </Button>
      </Space>
    );
  }

  if (
    reviewStatus === REVIEW_STATE.DRAFT ||
    reviewStatus === REVIEW_STATE.ACCEPTED
  )
    return null;

  return null;
};

StudentsControls.propTypes = {
  reviewStatus: PropTypes.string.isRequired,
  toggleReviewStatus: PropTypes.func.isRequired,
  editReview: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

export default StudentsControls;
