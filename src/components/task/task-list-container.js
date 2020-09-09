import React from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import TaskList from './task-list';

import store from '../../redux/store';
import * as actions from '../../redux/actions';

const TaskListContainer = () => {
  const taskItems = useSelector(({ taskReducer }) => taskReducer.items);
  const newFilter = useSelector(({ filterReducer }) => filterReducer.filter);
  const searchedValue = useSelector(
    ({ filterReducer }) => filterReducer.search
  );

  const filterItems = (tasks, filter) => {
    if (filter === 'all' || filter === undefined || filter === null) {
      return tasks;
    }
    return tasks.filter((task) => task.category === filter);
  };

  const search = (tasks, value) => {
    if (!value || value.length === 0) {
      return tasks;
    }

    return tasks.filter(
      (task) =>
        task.description.toLowerCase().indexOf(value.trimLeft().toLowerCase()) >
        -1
    );
  };

  const { dispatch } = store;
  const { removeTaskItem } = bindActionCreators(actions, dispatch);

  const searchedTaskItems = search(taskItems, searchedValue);
  const filteredTaskItems = filterItems(searchedTaskItems, newFilter);

  return (
    <TaskList removeTaskItem={removeTaskItem} taskItems={filteredTaskItems} />
  );
};

export default TaskListContainer;
