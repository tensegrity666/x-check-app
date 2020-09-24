import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const ConditionalTextarea = ({ text, record, userStatus }) => {
  const { TextArea } = Input;
  if (record.authorship === userStatus) {
    return <TextArea value={text} />;
  }
  return text;
};

ConditionalTextarea.propTypes = {
  text: PropTypes.node.isRequired,
  record: PropTypes.shape({
    authorship: PropTypes.string,
  }).isRequired,
  userStatus: PropTypes.string.isRequired,
};

export default ConditionalTextarea;
