import { actionTypes } from '../constants';

const { ADD_TASK_ITEM, REMOVE_TASK_ITEM, UPDATE_TASK_ITEM_SCORE } = actionTypes;

const addTaskItem = (payload) => {
  return {
    type: ADD_TASK_ITEM,
    payload,
  };
};

const removeTaskItem = (itemID) => {
  return {
    type: REMOVE_TASK_ITEM,
    payload: itemID,
  };
};

const updateTaskItemScore = (score) => {
  return {
    type: UPDATE_TASK_ITEM_SCORE,
    payload: score,
  };
};

export { addTaskItem, removeTaskItem, updateTaskItemScore };
