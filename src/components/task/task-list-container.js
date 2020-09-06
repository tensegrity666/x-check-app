import React from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import TaskList from './task-list';

import store from '../../redux/store';
import * as actions from '../../redux/actions';

const TaskListContainer = () => {
  const taskItems = useSelector(({ taskReducer }) => taskReducer.items);

  const { dispatch } = store;
  const { removeTaskItem } = bindActionCreators(actions, dispatch);

  return <TaskList removeTaskItem={removeTaskItem} taskItems={taskItems} />;
};

export default TaskListContainer;
