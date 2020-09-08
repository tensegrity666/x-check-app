import { actionTypes } from '../constants';

const initialFilters = {
  filter: 'all',
  search: null,
  isButtonActive: false,
};

const filterReducer = (state = initialFilters, { type, payload }) => {
  const { SEARCH_ITEM, CHANGE_FILTER } = actionTypes;

  switch (type) {
    case CHANGE_FILTER:
      return {
        ...state,
        filter: payload,
        isButtonActive: true,
      };

    case SEARCH_ITEM:
      return {
        ...state,
        search: payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
