const actionTypes = {
  ADD_TASK_ITEM: 'ADD_TASK_ITEM',
  REMOVE_TASK_ITEM: 'REMOVE_TASK_ITEM',
  UPDATE_TASK_ITEM_SCORE: 'UPDATE_TASK_ITEM_SCORE',
};

const categories = {
  basic: {
    title: 'Basic Scope',
    scoreRange: [0, 20],
  },
  advanced: {
    title: 'Advanced Scope',
    scoreRange: [0, 30],
  },
  hacker: {
    title: 'Hacker Scope',
    scoreRange: [0, 50],
  },
  fines: {
    title: 'Fines',
    scoreRange: [-10, 0],
  },
};

const taskStates = {
  draft: 'DRAFT',
  published: 'PUBLISHED',
  archived: 'ARCHIVED',
};

export { actionTypes, categories, taskStates };
