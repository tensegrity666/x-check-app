import { actionTypes } from '../constants';

const {
  ADD_TASK_ITEM,
  REMOVE_TASK_ITEM,
  UPDATE_TASK_ITEM_SCORE,
  CHANGE_FILTER,
  SEARCH_ITEM,
  EDIT_TASK_TITLE,
  LOGIN,
  ADD_ROLE,
  LOAD_FROM_LOCAL_STORAGE,
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

const changeFilter = (activeFilter) => {
  return {
    type: CHANGE_FILTER,
    payload: activeFilter,
  };
};

const searchItem = (value) => {
  return {
    type: SEARCH_ITEM,
    payload: value,
  };
};

const getUserInfo = (payload) => {
  return {
    type: LOGIN,
    payload,
  };
};

const addUserRole = (payload) => {
  return {
    type: ADD_ROLE,
    payload,
  };
};

const loadFromLocalStorage = (payload) => {
  return {
    type: LOAD_FROM_LOCAL_STORAGE,
    payload,
  };
};

export {
  addTaskItem,
  removeTaskItem,
  updateTaskItemScore,
  changeFilter,
  searchItem,
  editTaskTitle,
  getUserInfo,
  addUserRole,
  loadFromLocalStorage,
};
