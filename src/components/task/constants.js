import uniqid from 'uniqid';

const createTaskItem = (description) => {
  return {
    id: uniqid('task-item-'),
    currentScore: null,
    category: '',
    description,
    printDate: new Date().toLocaleDateString(),
  };
};

export default createTaskItem;
