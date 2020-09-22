import { actionTypes } from '../constants';

const selfGrade = {
  totalScore: null,
  summaryComment: '',
  items: [
    {
      comment: '',
      score: null,
      status: null,
    },
  ],
};

const selfGradeReducer = (state = selfGrade, { type, payload }) => {
  const { RATE_TASK_ITEM, COPY_TASK } = actionTypes;
  const { items } = state;

  switch (type) {
    case RATE_TASK_ITEM:
      return {
        ...state,
        items: [...items, { score: payload }],
      };

    case COPY_TASK:
      return {
        ...state,
        totalScore: payload.totalScore,
        summaryComment: payload.summaryComment,
        items: payload.items,
      };

    default:
      return state;
  }
};

export default selfGradeReducer;
