/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';

export const SELF_GRADE_ITEM = PropTypes.shape({
  id: PropTypes.string,
  score: PropTypes.string,
  comment: PropTypes.string,
});

export const REVIEW_REQUEST = PropTypes.shape({
  id: PropTypes.string,
  crossCheckSessionId: PropTypes.string,
  author: PropTypes.string,
  task: PropTypes.string,
  state: PropTypes.string,
  selfGrade: PropTypes.arrayOf(SELF_GRADE_ITEM),
});
