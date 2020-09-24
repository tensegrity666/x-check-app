import React from 'react';
import PropTypes from 'prop-types';
import { InputNumber } from 'antd';

const ConditionalScoreInput = ({ text, record, userStatus, handleChange }) => {
  if (record.authorship === userStatus) {
    return <InputNumber value={text} onChange={handleChange} />;
  }
  return text;
};

ConditionalScoreInput.propTypes = {
  text: PropTypes.node.isRequired,
  record: PropTypes.shape({
    authorship: PropTypes.string,
  }).isRequired,
  userStatus: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default ConditionalScoreInput;
