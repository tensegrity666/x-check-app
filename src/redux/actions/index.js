import {
  addTaskItem,
  removeTaskItem,
  updateTaskItemScore,
  editTaskTitle,
  toggleSaved,
  createTask,
  editDeadline,
  addAuthor,
} from './task-actions';

import { changeFilter, searchItem } from './filter-actions';

import {
  getUserInfo,
  addUserRole,
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
  signOutAndClearLocalStorage,
  addTaskItem,
  removeTaskItem,
  updateTaskItemScore,
  editTaskTitle,
  toggleSaved,
  createTask,
  editDeadline,
  addAuthor,
  fetchReviewRequestsBegin,
  fetchReviewRequestsSuccess,
};
