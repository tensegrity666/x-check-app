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

import TaskApi from '../../services/rest-api/tasks-api';

const Task = () => {
  const { Content } = Layout;
  const { wrapper, content } = styles;

  const api = new TaskApi();

  const { dispatch } = store;
  const { createTask, loadTaskFromLocalStorage } = bindActionCreators(
    actions,
    dispatch
  );

  const { githubId } = store.getState().loginReducer;
  const data = store.getState().taskReducer;

  useEffect(() => {
    if (localStorage.getItem('savedTaskInProcess')) {
      const savedTask = JSON.parse(localStorage.getItem('savedTaskInProcess'));
      loadTaskFromLocalStorage(savedTask);
      return;
    }

    let taskId = '';
    api.createTaskHeader({ githubId, data }).then((res) => {
      taskId = res.id;
      createTask({ githubId, taskId });
      localStorage.setItem('savedTaskInProcess', JSON.stringify(data));
    });
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
