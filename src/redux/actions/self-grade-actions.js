import { actionTypes } from '../constants';

const { RATE_TASK_ITEM, COPY_TASK } = actionTypes;

export const rateTaskItem = (payload) => {
  return {
    type: RATE_TASK_ITEM,
    payload,
  };
};

export const copyTaskToState = (payload) => {
  return {
    type: COPY_TASK,
    payload,
  };
};
