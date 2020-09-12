import { actionTypes } from '../constants';

const { CHANGE_FILTER, SEARCH_ITEM } = actionTypes;

const changeFilter = (activeFilter) => {
  return {
    type: CHANGE_FILTER,
    payload: activeFilter,
  };
};

const searchItem = (value) => {
  return {
    type: SEARCH_ITEM,
    payload: value,
  };
};

export { changeFilter, searchItem };
