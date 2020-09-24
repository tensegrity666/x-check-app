import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import { REVIEW_STATE } from './constants';

const AuthorsControls = ({ reviewStatus }) => {
  return reviewStatus === REVIEW_STATE.DRAFT && <Button>Publish</Button>;
};

AuthorsControls.propTypes = {
  reviewStatus: PropTypes.string.isRequired,
};

export default AuthorsControls;
