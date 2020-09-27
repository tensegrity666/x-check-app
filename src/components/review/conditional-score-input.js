import React from 'react';
import PropTypes from 'prop-types';
import ScoreInput from './score-input';
import { REVIEW_STATE } from './constants';

const ConditionalScoreInput = ({
  text,
  record,
  userStatus,
  reviewStatus,
  handleChange,
}) => {
  const { authorship, minScore, maxScore, average } = record;
  if (
    authorship === userStatus &&
    reviewStatus !== REVIEW_STATE.PUBLISHED &&
    reviewStatus !== REVIEW_STATE.ACCEPTED
  ) {
    return (
      <ScoreInput
        text={text}
        handleChange={handleChange}
        minScore={minScore}
        maxScore={maxScore}
        average={average}
      />
    );
  }
  return text;
};

ConditionalScoreInput.propTypes = {
  text: PropTypes.node.isRequired,
  record: PropTypes.shape({
    authorship: PropTypes.string,
    minScore: PropTypes.number,
    maxScore: PropTypes.number,
    average: PropTypes.number,
  }).isRequired,
  userStatus: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default ConditionalScoreInput;
