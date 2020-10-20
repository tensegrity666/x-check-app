import { actionTypes } from '../constants';

const { CHANGE_FILTER, SEARCH_ITEM } = actionTypes;

export const changeFilter = (activeFilter) => {
  return {
    type: CHANGE_FILTER,
    payload: activeFilter,
  };
};

export const searchItem = (value) => {
  return {
    type: SEARCH_ITEM,
    payload: value,
  };
};
