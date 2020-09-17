import {
  addTaskItem,
  removeTaskItem,
  updateTaskItemScore,
  editTaskTitle,
  toggleSaved,
  createTask,
  editDeadline,
  loadTaskFromLocalStorage,
  addAuthor,
} from './task-actions';

import { changeFilter, searchItem } from './filter-actions';

import {
  getUserInfo,
  addUserRole,
  loadFromLocalStorage,
  signOutAndClearLocalStorage,
} from './login-actions';

import {
  fetchReviewRequestsBegin,
  fetchReviewRequestsSuccess,
} from './review-requests-actions';

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
  toggleSaved,
  createTask,
  editDeadline,
  loadTaskFromLocalStorage,
  addAuthor,
  fetchReviewRequestsBegin,
  fetchReviewRequestsSuccess,
};
