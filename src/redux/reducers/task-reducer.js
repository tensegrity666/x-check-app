/* eslint-disable no-case-declarations */

import { actionTypes } from '../constants';
import initialState from '../initial-state';

const taskReducer = (state = initialState, { type, payload }) => {
  const { ADD_TASK_ITEM, REMOVE_TASK_ITEM } = actionTypes;

  switch (type) {
    case ADD_TASK_ITEM:
      const newTaskItem = {
        category: payload.category,
        description: payload.inputValue,
        currentScore: payload.rangeValue,
      };

      return {
        ...state,
        items: [...state.items, newTaskItem],
      };

    case REMOVE_TASK_ITEM:
      return {
        ...state,
        items: [...state.items, newTaskItem],
      };

    default:
      return state;
  }
};

export default taskReducer;
