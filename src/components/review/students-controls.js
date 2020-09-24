import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import { REVIEW_STATE } from './constants';

const StudentsControls = ({ reviewStatus, onDisputeReview }) => {
  return (
    reviewStatus === REVIEW_STATE.PUBLISHED && (
      <>
        <Button danger onClick={onDisputeReview}>
          Dispute
        </Button>
        <Button>Accept</Button>
      </>
    )
  );
};

StudentsControls.propTypes = {
  reviewStatus: PropTypes.string.isRequired,
  onDisputeReview: PropTypes.func.isRequired,
};

export default StudentsControls;
