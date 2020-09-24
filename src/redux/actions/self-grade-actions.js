import { actionTypes } from '../constants';

const {
  RATE_TASK,
  COPY_TASK,
  COMMENT_TASK_ITEM,
  SUMMARY_COMMENT,
} = actionTypes;

export const rateTask = ({ id, rate }) => {
  return {
    type: RATE_TASK,
    payload: { id, rate },
  };
};

export const commentTaskItem = (id, comment) => {
  return {
    type: COMMENT_TASK_ITEM,
    payload: { id, comment },
  };
};

export const addSummaryComment = (comment) => {
  return {
    type: SUMMARY_COMMENT,
    payload: comment,
  };
};

export const copyTaskToState = (payload) => {
  return {
    type: COPY_TASK,
    payload,
  };
};
