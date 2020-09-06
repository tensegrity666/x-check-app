import React from 'react';
import { Provider } from 'react-redux';
import { Layout } from 'antd';

import TaskHeader from './task-header';
import AddNewItemContainer from './add-new-item-container';
import Searcher from './searcher';
import store from '../../redux/store';
import TaskListContainer from './task-list-container';

const Task = () => {
  const { Content } = Layout;

  return (
    <Provider store={store}>
      <Layout style={{ padding: '0 50px' }}>
        <TaskHeader />
        <Searcher />
        <Content style={{ backgroundColor: 'white' }}>
          <TaskListContainer />
        </Content>
        <AddNewItemContainer />
      </Layout>
    </Provider>
  );
};

export default Task;
