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

export const GRADE_ITEM = PropTypes.shape({
  id: PropTypes.string,
  score: PropTypes.string,
  comment: PropTypes.string,
  protest: PropTypes.string,
  suggestedScore: PropTypes.string,
});

export const REVIEW = PropTypes.shape({
  id: PropTypes.string,
  requestId: PropTypes.string,
  author: PropTypes.string,
  state: PropTypes.oneOf(['DRAFT', 'PUBLISHED', 'ACCEPTED', 'DISPUTED']),
  grade: PropTypes.arrayOf(GRADE_ITEM),
});
