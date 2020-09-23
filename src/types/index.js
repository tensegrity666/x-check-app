/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';

export const REVIEW_REQUEST = PropTypes.shape({
  id: PropTypes.string,
  crossCheckSessionId: PropTypes.string,
  author: PropTypes.string,
  task: PropTypes.string,
  state: PropTypes.string,
  selfGrade: PropTypes.object,
});
