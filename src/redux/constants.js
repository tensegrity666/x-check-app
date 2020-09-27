const actionTypes = {
  CREATE_TASK: 'CREATE_TASK',
  ADD_TASK_ITEM: 'ADD_TASK_ITEM',
  REMOVE_TASK_ITEM: 'REMOVE_TASK_ITEM',
  UPDATE_TASK_ITEM_SCORE: 'UPDATE_TASK_ITEM_SCORE',
  CHANGE_FILTER: 'CHANGE_FILTER',
  SEARCH_ITEM: 'SEARCH_ITEM',
  EDIT_TASK_TITLE: 'EDIT_TASK_TITLE',
  ADD_AUTHOR: 'ADD_AUTHOR',
  LOAD_TASK_FROM_LOCAL_STORAGE: 'LOAD_TASK_FROM_LOCAL_STORAGE',
  SAVE_TASK_ON_SERVER: 'SAVE_TASK_ON_SERVER',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  ADD_ROLE: 'ADD_ROLE',
  SIGN_OUT: 'SIGN_OUT',
  EDIT_DEADLINE: 'EDIT_DEADLINE',
  FETCH_REVIEW_REQUESTS_BEGIN: 'FETCH_REVIEW_REQUESTS_BEGIN',
  FETCH_REVIEW_REQUESTS_SUCCESS: 'FETCH_REVIEW_REQUESTS_SUCCESS',
  SET_REVIEW_REQUEST: 'SET_REVIEW_REQUEST',
  FETCH_REVIEW_REQUEST_SUCCESS: 'FETCH_REVIEW_REQUEST_SUCCESS',
  FETCH_TASKS_REQUEST: 'FETCH_TASKS_REQUEST',
  FETCH_TASKS_SUCCESS: 'FETCH_TASKS_SUCCESS',
  FETCH_ONE_TASK_SUCCESS: 'FETCH_ONE_TASK_SUCCESS',
  FETCH_STUDENTS_BY_REVIEWER: 'FETCH_STUDENTS_BY_REVIEWER',
  FETCH_REVIEW_BEGIN: 'FETCH_REVIEW_BEGIN',
  REVIEW_EFFECT_BEGIN: 'REVIEW_EFFECT_BEGIN',
  REVIEW_EFFECT_ERROR: 'REVIEW_EFFECT_ERROR',
  FETCH_REVIEW_SUCCESS: 'FETCH_REVIEW_SUCCESS',
  API_ERROR_RESPONSE: 'API_ERROR_RESPONSE',
  APP_ERROR: 'APP_ERROR',
};

const categories = {
  basic: {
    title: 'Basic Scope',
  },
  advanced: {
    title: 'Advanced Scope',
  },
  hacker: {
    title: 'Hacker Scope',
  },
  fines: {
    title: 'Fines',
  },
};

const taskStates = {
  draft: 'DRAFT',
  published: 'PUBLISHED',
  archived: 'ARCHIVED',
};

export { actionTypes, categories, taskStates };
