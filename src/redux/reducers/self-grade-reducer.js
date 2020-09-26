/* eslint-disable no-case-declarations */
import { actionTypes } from '../constants';

const selfGrade = {
  maxScore: null,
  totalScore: 0,
  summaryComment: '',
  deadline: '',
  taskTitle: '',
  status: '',
  items: [
    {
      id: null,
      minScore: null,
      maxScore: null,
      category: '',
      title: '',
      description: '',
      score: 0,
      comment: '',
    },
  ],
};

let index;

const getCurrentItem = (arr, payload) => {
  return arr.find((item) => item.id === payload.id);
};

const selfGradeReducer = (state = selfGrade, { type, payload }) => {
  const { items, totalScore } = state;
  const {
    RATE_TASK,
    COPY_TASK,
    COMMENT_TASK_ITEM,
    SUMMARY_COMMENT,
    CHANGE_STATUS,
  } = actionTypes;

  switch (type) {
    case RATE_TASK:
      const currentItem = items.find((item) => item.id === payload.id);
      index = items.indexOf(currentItem);
      const newtItem = {
        ...currentItem,
        score: payload.rate,
      };

      items[index] = newtItem;

      return {
        ...state,
        totalScore: totalScore + newtItem.score,
        items: [...items],
      };

    case COMMENT_TASK_ITEM:
      const currentComment = getCurrentItem(items, payload);
      index = items.indexOf(currentComment);
      const newComment = {
        ...currentComment,
        comment: payload.comment,
      };

      items[index] = newComment;

      return {
        ...state,
        items: [...items],
      };

    case COPY_TASK:
      return {
        ...state,
        taskTitle: payload.taskTitle,
        deadline: payload.deadline,
        maxScore: payload.totalScore,
        summaryComment: payload.summaryComment,
        items: payload.items,
      };

    case SUMMARY_COMMENT:
      return {
        ...state,
        summaryComment: payload,
      };

    case CHANGE_STATUS:
      return {
        ...state,
        status: payload,
      };

    default:
      return state;
  }
};

export default selfGradeReducer;
