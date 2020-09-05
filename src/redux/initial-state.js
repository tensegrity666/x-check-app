import uniqid from 'uniqid';
import { categories, taskStates } from './constants';

const { basic, advanced, fines } = categories;
const { draft } = taskStates;

const initialState = {
  tasks: [
    {
      id: uniqid('task-'),
      author: 'cardamo',
      taskTitle: 'Very difficult task',
      state: draft,
      categories,
      dateOfCreate: new Date().toLocaleDateString(),
      totalScore: 0,
      items: [
        {
          id: uniqid('task-item-'),
          scoreRange: basic.scoreRange,
          currentScore: 0,
          category: basic.title,
          description: 'You need to make things right, not wrong',
        },
        {
          id: uniqid('task-item-'),
          scoreRange: advanced.scoreRange,
          currentScore: 0,
          category: advanced.title,
          description: 'Be creative and make up some more awesome things',
        },
        {
          id: uniqid('task-item-'),
          scoreRange: fines.scoreRange,
          currentScore: 0,
          category: fines.title,
          description: 'App causes BSoD!',
        },
      ],
    },
    {
      id: uniqid('task-'),
      author: 'cardamo-2',
      state: draft,
      categories,
      items: [
        {
          id: uniqid('task-item-'),
          scoreRange: basic.scoreRange,
          category: basic.title,
          description: 'You need to make things right, not wrong',
        },
        {
          id: uniqid('task-item-'),
          scoreRange: advanced.scoreRange,
          category: advanced.title,
          description: 'Be creative and make up some more awesome things',
        },
        {
          id: uniqid('task-item-'),
          scoreRange: fines.scoreRange,
          category: fines.title,
          description: 'App causes BSoD!',
        },
      ],
    },
  ],
};

export default initialState;
