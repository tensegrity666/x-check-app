import uniqid from 'uniqid';
import { categories, taskStates } from './constants';

const { draft } = taskStates;

const initialState = {
  id: uniqid('task-'),
  author: 'cardamo',
  taskTitle: 'Very difficult task',
  state: draft,
  categories,
  dateOfCreate: new Date().toLocaleDateString(),
  totalScore: 0,
  items: [],
};

export default initialState;
