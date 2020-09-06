import { actionTypes } from '../constants';

const { ADD_TASK_ITEM, REMOVE_TASK_ITEM, UPDATE_TASK_ITEM_SCORE } = actionTypes;

const addTaskItem = (payload) => {
  return {
    type: ADD_TASK_ITEM,
    payload,
  };
};

const removeTaskItem = (id) => {
  return {
    type: REMOVE_TASK_ITEM,
    payload: id,
  };
};

const updateTaskItemScore = (score) => {
  return {
    type: UPDATE_TASK_ITEM_SCORE,
    payload: score,
  };
};

export { addTaskItem, removeTaskItem, updateTaskItemScore };
