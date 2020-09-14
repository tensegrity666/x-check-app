import {
  addTaskItem,
  removeTaskItem,
  updateTaskItemScore,
  editTaskTitle,
  saveTaskOnServer,
  createTask,
  editDeadline,
  loadTaskFromLocalStorage,
} from './task-actions';

import { changeFilter, searchItem } from './filter-actions';

import {
  getUserInfo,
  addUserRole,
  loadFromLocalStorage,
  signOutAndClearLocalStorage,
} from './login-actions';

export {
  changeFilter,
  searchItem,
  getUserInfo,
  addUserRole,
  loadFromLocalStorage,
  signOutAndClearLocalStorage,
  addTaskItem,
  removeTaskItem,
  updateTaskItemScore,
  editTaskTitle,
  saveTaskOnServer,
  createTask,
  editDeadline,
  loadTaskFromLocalStorage,
};
