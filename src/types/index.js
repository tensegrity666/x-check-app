import PropTypes from 'prop-types';

export const SELF_GRADE_ITEM = PropTypes.shape({
  id: PropTypes.string,
  score: PropTypes.number,
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
  score: PropTypes.number,
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

export const TASK_ITEM = PropTypes.shape({
  id: PropTypes.string,
  minScore: PropTypes.number,
  maxScore: PropTypes.number,
  category: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
});

export const TASK = PropTypes.shape({
  id: PropTypes.string,
  author: PropTypes.string,
  taskTitle: PropTypes.string,
  state: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string),
  dateOfCreate: PropTypes.string,
  deadline: PropTypes.string,
  totalScore: PropTypes.number,
  items: PropTypes.arrayOf(TASK_ITEM),
});
