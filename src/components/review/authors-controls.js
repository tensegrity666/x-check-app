import React from 'react';
import PropTypes from 'prop-types';
import { Space, Button } from 'antd';

import { REVIEW_STATE } from './constants';
import { actionReviewList as modify } from '../../services/rest-api/constants';

const AuthorsControls = ({
  reviewStatus,
  createReview,
  editReview,
  toggleReviewStatus,
}) => {
  const handlePublish = async () => {
    await toggleReviewStatus(modify.DRAFT_TO_PUBLISHED);
    await editReview();
  };

  if (reviewStatus === REVIEW_STATE.DRAFT) {
    return (
      <Space>
        <Button onClick={createReview}>Save Draft</Button>
        <Button onClick={handlePublish}>Publish</Button>
      </Space>
    );
  }

  if (reviewStatus === REVIEW_STATE.PUBLISHED) {
    return (
      <Space>
        <Button onClick={editReview}>Save</Button>
      </Space>
    );
  }

  if (reviewStatus === REVIEW_STATE.DISPUTED) {
    return (
      <Space>
        <Button onClick={editReview}>Save</Button>
        <Button onClick={() => toggleReviewStatus(modify.DISPUTED_TO_ACCEPTED)}>
          Accept
        </Button>
      </Space>
    );
  }

  if (reviewStatus === REVIEW_STATE.ACCEPTED) return null;
  return null;
};

AuthorsControls.propTypes = {
  reviewStatus: PropTypes.string.isRequired,
  createReview: PropTypes.func.isRequired,
  editReview: PropTypes.func.isRequired,
  toggleReviewStatus: PropTypes.func.isRequired,
};

export default AuthorsControls;
