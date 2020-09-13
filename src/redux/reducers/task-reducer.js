/* eslint-disable no-case-declarations */
import uniqid from 'uniqid';
import { actionTypes, categories, taskStates } from '../constants';

const { draft } = taskStates;

const initialTask = {
  author: '',
  taskTitle: '',
  state: draft,
  categories,
  dateOfCreate: null,
  totalScore: 0,
  items: [],
  isSaved: false,
};

const taskReducer = (state = initialTask, { type, payload }) => {
  const {
    ADD_TASK_ITEM,
    REMOVE_TASK_ITEM,
    EDIT_TASK_TITLE,
    SAVE_TASK_ON_SERVER,
    CREATE_TASK,
  } = actionTypes;

  const { totalScore, items } = state;

  switch (type) {
    case CREATE_TASK:
      return {
        ...state,
        dateOfCreate: new Date().toLocaleDateString(),
        author: payload,
      };

    case ADD_TASK_ITEM:
      const newTaskItem = {
        id: uniqid('task-item-'),
        category: payload.category,
        description: payload.inputValue,
        currentScore: payload.rangeValue,
      };

      return {
        ...state,
        totalScore: totalScore + newTaskItem.currentScore,
        items: [newTaskItem, ...items],
      };

    case REMOVE_TASK_ITEM:
      const itemID = payload;

      return {
        ...state,
        items: [...items].filter((item) => item.id !== itemID),
      };

    case EDIT_TASK_TITLE:
      return {
        ...state,
        taskTitle: payload,
      };

    case SAVE_TASK_ON_SERVER:
      return {
        ...state,
        isSaved: true,
      };

    default:
      return state;
  }
};

export default taskReducer;
