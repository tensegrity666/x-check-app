import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Space, Button } from 'antd';

import { REVIEW_STATE } from './constants';
import { actionReviewList as modify } from '../../services/rest-api/constants';
import store from '../../redux/store';

const AuthorsControls = ({
  reviewStatus,
  createReview,
  editReview,
  toggleReviewStatus,
}) => {
  const review = useSelector(({ reviewReducer }) => reviewReducer.review);

  const handlePublish = async () => {
    if (review.id) {
      await editReview();
      await toggleReviewStatus(modify.DRAFT_TO_PUBLISHED);
    } else {
      await createReview();
      const updatedId = store.getState().reviewReducer.review.id;
      await toggleReviewStatus(modify.DRAFT_TO_PUBLISHED, updatedId);
    }
  };

  const handleDraftSave = () => {
    if (review.id) {
      editReview();
    } else {
      createReview();
    }
  };

  if (reviewStatus === REVIEW_STATE.DRAFT) {
    return (
      <Space size="middle">
        <Button onClick={handleDraftSave}>Save Draft</Button>
        <Button onClick={handlePublish}>Publish</Button>
      </Space>
    );
  }

  if (reviewStatus === REVIEW_STATE.PUBLISHED) {
    return (
      <Space size="middle">
        <Button onClick={editReview}>Save</Button>
      </Space>
    );
  }

  if (reviewStatus === REVIEW_STATE.DISPUTED) {
    return (
      <Space size="middle">
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
