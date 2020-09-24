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
  signOutAndClearLocalStorage,
} from './login-actions';

import {
  fetchReviewRequestsBegin,
  fetchReviewRequestsSuccess,
} from './review-requests-actions';

import {
  rateTask,
  copyTaskToState,
  commentTaskItem,
  addSummaryComment,
} from './self-grade-actions';

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
  loadTaskFromLocalStorage,
  addAuthor,
  fetchReviewRequestsBegin,
  fetchReviewRequestsSuccess,
  rateTask,
  copyTaskToState,
  commentTaskItem,
  addSummaryComment,
};
