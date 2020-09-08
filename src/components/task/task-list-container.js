import React from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import TaskList from './task-list';

import store from '../../redux/store';
import * as actions from '../../redux/actions';

const TaskListContainer = () => {
  const taskItems = useSelector(({ taskReducer }) => taskReducer.items);
  const newFilter = useSelector(({ filterReducer }) => filterReducer);

  const filterItems = (tasks, filter) => {
    if (filter === 'all' || filter === undefined || filter === null) {
      return tasks;
    }
    return tasks.filter((task) => task.category === filter);
  };

  const { dispatch } = store;
  const { removeTaskItem } = bindActionCreators(actions, dispatch);

  const filteredTaskItems = filterItems(taskItems, newFilter);

  return (
    <TaskList removeTaskItem={removeTaskItem} taskItems={filteredTaskItems} />
  );
};

export default TaskListContainer;
