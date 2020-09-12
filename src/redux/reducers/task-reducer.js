/* eslint-disable no-case-declarations */
import uniqid from 'uniqid';
import { actionTypes, categories, taskStates } from '../constants';

const { draft } = taskStates;

const initialTask = {
  author: '',
  taskTitle: '',
  state: draft,
  categories,
  dateOfCreate: new Date().toLocaleDateString(),
  totalScore: 0,
  items: [],
  isSaved: false,
};

const taskReducer = (state = initialTask, { type, payload }) => {
  const {
    ADD_TASK_ITEM,
    REMOVE_TASK_ITEM,
    EDIT_TASK_TITLE,
    SET_TASK_AUTHOR,
    SAVE_TASK_ON_SERVER,
  } = actionTypes;
  const { totalScore, items } = state;

  switch (type) {
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

    case SET_TASK_AUTHOR:
      return {
        ...state,
        author: payload,
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
