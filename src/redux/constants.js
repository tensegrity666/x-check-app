const actionTypes = {
  CREATE_TASK: 'CREATE_TASK',
  ADD_TASK_ITEM: 'ADD_TASK_ITEM',
  REMOVE_TASK_ITEM: 'REMOVE_TASK_ITEM',
  UPDATE_TASK_ITEM_SCORE: 'UPDATE_TASK_ITEM_SCORE',
  CHANGE_FILTER: 'CHANGE_FILTER',
  SEARCH_ITEM: 'SEARCH_ITEM',
  EDIT_TASK_TITLE: 'EDIT_TASK_TITLE',
  SAVE_TASK_ON_SERVER: 'SAVE_TASK_ON_SERVER',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  ADD_ROLE: 'ADD_ROLE',
  LOAD_FROM_LOCAL_STORAGE: 'LOAD_FROM_LOCAL_STORAGE',
  SIGN_OUT: 'SIGN_OUT',
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
