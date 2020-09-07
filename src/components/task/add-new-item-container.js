import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddNewItem from './add-new-item';

import store from '../../redux/store';
import * as actions from '../../redux/actions';

const AddNewItemContainer = () => {
  const { dispatch } = store;
  const { addTaskItem } = bindActionCreators(actions, dispatch);

  const taskCategories = useSelector(
    ({ taskReducer }) => taskReducer.categories
  );

  const [inputValue, setInputValue] = useState(null);
  const [rangeValue, setRangeValue] = useState(0);
  const [category, setCategory] = useState(null);

  const onTextChange = (event) => {
    setInputValue(event.target.value.trimLeft());
  };

  const onItemSubmit = () => {
    if (inputValue && inputValue !== ' ' && category) {
      addTaskItem({ inputValue, rangeValue, category });
      setInputValue(null);
      setRangeValue(0);
    }
  };

  const onScoreRangeChange = (value) => {
    setRangeValue(value);
  };

  const onCategoryChange = (value) => {
    setCategory(value);
  };

  return (
    <AddNewItem
      onCategoryChange={onCategoryChange}
      taskCategories={taskCategories}
      onScoreRangeChange={onScoreRangeChange}
      onItemSubmit={onItemSubmit}
      onTextChange={onTextChange}
      inputValue={inputValue}
      rangeValue={rangeValue}
      category={category}
    />
  );
};

export default AddNewItemContainer;
