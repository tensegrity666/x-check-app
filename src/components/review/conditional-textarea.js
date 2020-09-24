import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const ConditionalTextarea = ({ text, record, userStatus, handleChange }) => {
  const { TextArea } = Input;
  const onChange = (e) => {
    handleChange(e);
  };
  if (record.authorship === userStatus) {
    return <TextArea value={text} onChange={onChange} />;
  }
  return text;
};

ConditionalTextarea.propTypes = {
  text: PropTypes.node.isRequired,
  record: PropTypes.shape({
    authorship: PropTypes.string,
  }).isRequired,
  userStatus: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default ConditionalTextarea;
