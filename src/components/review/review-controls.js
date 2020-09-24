import React from 'react';
import PropTypes from 'prop-types';
import { Space } from 'antd';

import { EDITORS } from './constants';
import StudentsControls from './students-controls';
import AuthorsControls from './authors-controls';

const ReviewControls = ({
  authorshipStatus,
  reviewStatus,
  onDisputeReview,
}) => {
  return (
    <Space>
      {authorshipStatus === EDITORS.STUDENT && (
        <StudentsControls
          reviewStatus={reviewStatus}
          onDisputeReview={onDisputeReview}
        />
      )}
      {authorshipStatus === EDITORS.REVIEWER && (
        <AuthorsControls reviewStatus={reviewStatus} />
      )}
    </Space>
  );
};

ReviewControls.propTypes = {
  authorshipStatus: PropTypes.string.isRequired,
  reviewStatus: PropTypes.string.isRequired,
  onDisputeReview: PropTypes.func.isRequired,
};

export default ReviewControls;
