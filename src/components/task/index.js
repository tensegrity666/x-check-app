import React from 'react';
import { Provider } from 'react-redux';
import { Layout } from 'antd';

import TaskHeader from './task-header';
import TaskList from './task-list';
import AddNewItemContainer from './add-new-item-container';
import Searcher from './searcher';
import store from '../../redux/store';

const Task = () => {
  return (
    <Provider store={store}>
      <Layout style={{ padding: '0 50px' }}>
        <TaskHeader taskIndex={0} />
        <Searcher />
        <TaskList taskIndex={0} />
        <AddNewItemContainer />
      </Layout>
    </Provider>
  );
};

export default Task;
