import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { bindActionCreators } from 'redux';

import TaskHeaderContainer from './task-header-container';
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
  const { createTask, loadTaskFromLocalStorage } = bindActionCreators(
    actions,
    dispatch
  );
  const { githubId } = store.getState().loginReducer;

  useEffect(() => {
    if (localStorage.getItem('savedTaskInProcess')) {
      const savedTask = JSON.parse(localStorage.getItem('savedTaskInProcess'));
      loadTaskFromLocalStorage(savedTask);
    }
    createTask(githubId);
  });

  return (
    <Layout className={wrapper}>
      <TaskHeaderContainer />
      <Searcher />
      <Content className={content}>
        <TaskListContainer />
      </Content>
      <AddNewItemContainer />
    </Layout>
  );
};

export default Task;
