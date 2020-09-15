import { actionTypes } from '../constants';

const {
  ADD_TASK_ITEM,
  REMOVE_TASK_ITEM,
  UPDATE_TASK_ITEM_SCORE,
  EDIT_TASK_TITLE,
  SAVE_TASK_ON_SERVER,
  CREATE_TASK,
  EDIT_DEADLINE,
  LOAD_TASK_FROM_LOCAL_STORAGE,
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

export const editDeadline = (date) => {
  return {
    type: EDIT_DEADLINE,
    payload: date,
  };
};

export const toggleSaved = () => {
  return {
    type: SAVE_TASK_ON_SERVER,
  };
};

export const createTask = (payload) => {
  return {
    type: CREATE_TASK,
    payload,
  };
};

export const loadTaskFromLocalStorage = (payload) => {
  return {
    type: LOAD_TASK_FROM_LOCAL_STORAGE,
    payload,
  };
};
