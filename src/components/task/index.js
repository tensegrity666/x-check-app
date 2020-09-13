import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { bindActionCreators } from 'redux';

import TaskHeader from './task-header';
import AddNewItemContainer from './add-new-item-container';
import Searcher from './searcher';
import TaskListContainer from './task-list-container';

import store from '../../redux/store';
import * as actions from '../../redux/actions';

import styles from './index.module.css';

const Task = () => {
  const { Content } = Layout;
  const { wrapper, content } = styles;

  const { dispatch } = store;
  const { createTask } = bindActionCreators(actions, dispatch);
  const { githubId } = store.getState().loginReducer;

  useEffect(() => {
    createTask(githubId);
  });

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
