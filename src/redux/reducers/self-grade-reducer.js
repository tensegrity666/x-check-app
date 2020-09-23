/* eslint-disable no-case-declarations */
import { actionTypes } from '../constants';

const selfGrade = {
  totalScore: null,
  summaryComment: '',
  items: [
    {
      id: null,
      minScore: null,
      maxScore: null,
      category: '',
      title: '',
      description: '',
      score: 0,
    },
  ],
};

const selfGradeReducer = (state = selfGrade, { type, payload }) => {
  const { RATE_TASK_ITEM, COPY_TASK } = actionTypes;
  const { items } = state;

  switch (type) {
    case RATE_TASK_ITEM:
      const currentItem = items.find((item) => item.id === payload.id);
      const index = items.indexOf(currentItem);

      const newtItem = {
        ...currentItem,
        score: payload.rate,
      };

      items[index] = newtItem;

      return {
        ...state,
        items: [...items],
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
