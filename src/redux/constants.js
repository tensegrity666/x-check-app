const actionTypes = {
  ADD_TASK_ITEM: 'ADD_TASK_ITEM',
  REMOVE_TASK_ITEM: 'REMOVE_TASK_ITEM',
  UPDATE_TASK_ITEM_SCORE: 'UPDATE_TASK_ITEM_SCORE',
  CHANGE_FILTER: 'CHANGE_FILTER',
  SEARCH_ITEM: 'SEARCH_ITEM',
  EDIT_TASK_TITLE: 'EDIT_TASK_TITLE',
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
