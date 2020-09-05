import { actionTypes } from '../constants';
import initialState from '../initial-state';

const taskReducer = (state = initialState.tasks, { type }) => {
  const { ADD_TASK_ITEM, REMOVE_TASK_ITEM, TOGGLE_ITEM_CATEGORY } = actionTypes;

  switch (type) {
    case ADD_TASK_ITEM:
      return {
        ...state,
      };

    case REMOVE_TASK_ITEM:
      return {
        ...state,
      };

    case TOGGLE_ITEM_CATEGORY:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default taskReducer;
