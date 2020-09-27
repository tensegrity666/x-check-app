import React from 'react';
import PropTypes from 'prop-types';

import { EDITORS } from './constants';
import StudentsControls from './students-controls';
import AuthorsControls from './authors-controls';
import styles from './index.module.css';

const ReviewControls = ({
  authorshipStatus,
  reviewStatus,
  onDisputeReview,
  createReview,
  editReview,
  toggleReviewStatus,
  isDisabled,
}) => {
  const { buttonsGroup } = styles;

  return (
    <section className={buttonsGroup}>
      {authorshipStatus === EDITORS.STUDENT && (
        <StudentsControls
          reviewStatus={reviewStatus}
          onDisputeReview={onDisputeReview}
          editReview={editReview}
          toggleReviewStatus={toggleReviewStatus}
          isDisabled={isDisabled}
        />
      )}

      {authorshipStatus === EDITORS.REVIEWER && (
        <AuthorsControls
          reviewStatus={reviewStatus}
          createReview={createReview}
          editReview={editReview}
          toggleReviewStatus={toggleReviewStatus}
          isDisabled={isDisabled}
        />
      )}
    </section>
  );
};

ReviewControls.propTypes = {
  onDisputeReview: PropTypes.func.isRequired,
  createReview: PropTypes.func.isRequired,
  editReview: PropTypes.func.isRequired,
  toggleReviewStatus: PropTypes.func.isRequired,
  reviewStatus: PropTypes.string,
  authorshipStatus: PropTypes.string,
  isDisabled: PropTypes.bool,
};

ReviewControls.defaultProps = {
  reviewStatus: null,
  authorshipStatus: null,
  isDisabled: false,
};

export default ReviewControls;
