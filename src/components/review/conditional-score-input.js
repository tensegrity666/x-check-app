import React from 'react';
import PropTypes from 'prop-types';
import { InputNumber } from 'antd';
import { SCORE_SELECT_DEFAULT_STEP } from './constants';

const ConditionalScoreInput = ({ text, record, userStatus, handleChange }) => {
  const { authorship, minScore, maxScore } = record;
  if (authorship === userStatus) {
    return (
      <InputNumber
        value={text}
        onChange={handleChange}
        min={minScore}
        max={maxScore}
        step={SCORE_SELECT_DEFAULT_STEP}
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
