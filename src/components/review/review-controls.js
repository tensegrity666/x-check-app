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
        />
      )}
      {authorshipStatus === EDITORS.REVIEWER && (
        <AuthorsControls
          reviewStatus={reviewStatus}
          createReview={createReview}
          editReview={editReview}
          toggleReviewStatus={toggleReviewStatus}
        />
      )}
    </section>
  );
};

ReviewControls.propTypes = {
  reviewStatus: PropTypes.string.isRequired,
  onDisputeReview: PropTypes.func.isRequired,
  createReview: PropTypes.func.isRequired,
  editReview: PropTypes.func.isRequired,
  toggleReviewStatus: PropTypes.func.isRequired,
  authorshipStatus: PropTypes.string,
};

ReviewControls.defaultProps = {
  authorshipStatus: null,
};

export default ReviewControls;
