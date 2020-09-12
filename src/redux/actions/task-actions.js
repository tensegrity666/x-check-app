import { actionTypes } from '../constants';

const {
  ADD_TASK_ITEM,
  REMOVE_TASK_ITEM,
  UPDATE_TASK_ITEM_SCORE,
  EDIT_TASK_TITLE,
  SET_TASK_AUTHOR,
  SAVE_TASK_ON_SERVER,
} = actionTypes;

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

const editTaskTitle = (title) => {
  return {
    type: EDIT_TASK_TITLE,
    payload: title,
  };
};

const setTaskAuthor = (name) => {
  return {
    type: SET_TASK_AUTHOR,
    payload: name,
  };
};

const saveTaskOnServer = () => {
  return {
    type: SAVE_TASK_ON_SERVER,
  };
};

export {
  addTaskItem,
  removeTaskItem,
  updateTaskItemScore,
  editTaskTitle,
  setTaskAuthor,
  saveTaskOnServer,
};
