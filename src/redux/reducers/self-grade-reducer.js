/* eslint-disable no-case-declarations */
import { actionTypes } from '../constants';

const selfGrade = {
  maxScore: null,
  totalScore: 0,
  summaryComment: '',
  deadline: '',
  taskTitle: '',
  state: '',
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

const selfGradeReducer = (currentState = selfGrade, { type, payload }) => {
  const { items, totalScore } = currentState;
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
        ...currentState,
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
        ...currentState,
        items: [...items],
      };

    case COPY_TASK:
      return {
        ...currentState,
        taskTitle: payload.taskTitle,
        deadline: payload.deadline,
        maxScore: payload.totalScore,
        summaryComment: payload.summaryComment,
        items: payload.items,
        state: payload.state,
      };

    case SUMMARY_COMMENT:
      return {
        ...currentState,
        summaryComment: payload,
      };

    case CHANGE_STATUS:
      return {
        ...currentState,
        state: payload,
      };

    default:
      return currentState;
  }
};

export default selfGradeReducer;
