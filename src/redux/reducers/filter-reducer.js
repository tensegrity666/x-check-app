import { actionTypes } from '../constants';

const BASE_FILTER = 'all';

const filterReducer = (state = BASE_FILTER, { type, activeFilter }) => {
  // eslint-disable-next-line no-unused-vars
  const { SEARCH_VALUE, CHANGE_FILTER } = actionTypes;

  switch (type) {
    case CHANGE_FILTER:
      return activeFilter;

    default:
      return state;
  }
};

export default filterReducer;
