import React from 'react';
import { Layout } from 'antd';

import TaskHeader from './task-header';
import AddNewItemContainer from './add-new-item-container';
import Searcher from './searcher';
import TaskListContainer from './task-list-container';

import styles from './index.module.css';

const Task = () => {
  const { Content } = Layout;
  const { wrapper, content } = styles;

  return (
    <Layout className={wrapper}>
      <TaskHeader />
      <Searcher />
      <Content className={content}>
        <TaskListContainer />
      </Content>
      <AddNewItemContainer />
    </Layout>
  );
};

export default Task;
