import React from 'react';
import { Provider } from 'react-redux';

import TaskHeader from './task-header';
import TaskList from './task-list';
import AddNewItem from './add-new-item';
import Searcher from './searcher';
import store from '../../redux/store';

const Task = () => {
  return (
    <Provider store={store}>
      <TaskHeader taskIndex={0} />
      <Searcher />
      <TaskList taskIndex={0} />
      <AddNewItem />
    </Provider>
  );
};

export default Task;
