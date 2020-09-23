import { actionTypes } from '../constants';

const { RATE_TASK_ITEM, COPY_TASK } = actionTypes;

export const rateTaskItem = ({ id, rate }) => {
  return {
    type: RATE_TASK_ITEM,
    payload: { id, rate },
  };
};

export const copyTaskToState = (payload) => {
  return {
    type: COPY_TASK,
    payload,
  };
};
