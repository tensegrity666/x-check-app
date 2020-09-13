import { actionTypes } from '../constants';

const {
  ADD_TASK_ITEM,
  REMOVE_TASK_ITEM,
  UPDATE_TASK_ITEM_SCORE,
  EDIT_TASK_TITLE,
  SAVE_TASK_ON_SERVER,
  CREATE_TASK,
} = actionTypes;

export const addTaskItem = (payload) => {
  return {
    type: ADD_TASK_ITEM,
    payload,
  };
};

export const removeTaskItem = (id) => {
  return {
    type: REMOVE_TASK_ITEM,
    payload: id,
  };
};

export const updateTaskItemScore = (score) => {
  return {
    type: UPDATE_TASK_ITEM_SCORE,
    payload: score,
  };
};

export const editTaskTitle = (title) => {
  return {
    type: EDIT_TASK_TITLE,
    payload: title,
  };
};

export const saveTaskOnServer = () => {
  return {
    type: SAVE_TASK_ON_SERVER,
  };
};

export const createTask = (author) => {
  return {
    type: CREATE_TASK,
    payload: author,
  };
};
