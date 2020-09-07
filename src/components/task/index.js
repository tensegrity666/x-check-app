import React from 'react';
import { Layout } from 'antd';

import TaskHeader from './task-header';
import AddNewItemContainer from './add-new-item-container';
import Searcher from './searcher';
import TaskListContainer from './task-list-container';

const Task = () => {
  const { Content } = Layout;

  return (
    <Layout style={{ padding: '0 50px' }}>
      <TaskHeader />
      <Searcher />
      <Content style={{ backgroundColor: 'white' }}>
        <TaskListContainer />
      </Content>
      <AddNewItemContainer />
    </Layout>
  );
};

export default Task;
