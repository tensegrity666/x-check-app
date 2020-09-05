import uniqid from 'uniqid';
import { categories, taskStates } from './constants';

const { basic, advanced, fines } = categories;
const { draft } = taskStates;

const initialState = {
  tasks: [
    {
      id: uniqid('task-'),
      author: 'cardamo',
      state: draft,
      categories,
      items: [
        {
          id: uniqid('task-item-'),
          scoreRange: basic.scoreRange,
          category: basic.title,
          title: 'Basic things',
          description: 'You need to make things right, not wrong',
        },
        {
          id: uniqid('task-item-'),
          scoreRange: advanced.scoreRange,
          category: advanced.title,
          title: 'More awesome things',
          description: 'Be creative and make up some more awesome things',
        },
        {
          id: uniqid('task-item-'),
          scoreRange: fines.scoreRange,
          category: fines.title,
          title: 'App crashes',
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
          title: 'Basic things',
          description: 'You need to make things right, not wrong',
        },
        {
          id: uniqid('task-item-'),
          scoreRange: advanced.scoreRange,
          category: advanced.title,
          title: 'More awesome things',
          description: 'Be creative and make up some more awesome things',
        },
        {
          id: uniqid('task-item-'),
          scoreRange: fines.scoreRange,
          category: fines.title,
          title: 'App crashes',
          description: 'App causes BSoD!',
        },
      ],
    },
  ],
};

export default initialState;
