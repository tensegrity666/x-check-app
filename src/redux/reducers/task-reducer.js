/* eslint-disable no-case-declarations */
import uniqid from 'uniqid';
import { actionTypes } from '../constants';
import initialState from '../initial-state';

const taskReducer = (state = initialState, { type, payload }) => {
  const { ADD_TASK_ITEM, REMOVE_TASK_ITEM } = actionTypes;
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
        items: [...items, newTaskItem],
      };

    case REMOVE_TASK_ITEM:
      const itemID = payload;

      return {
        ...state,
        items: [...items].filter((item) => item.id !== itemID),
      };

    default:
      return state;
  }
};

export default taskReducer;
