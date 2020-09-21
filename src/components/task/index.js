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
  const {
    createTask,
    loadTaskFromLocalStorage,
    addAuthor,
  } = bindActionCreators(actions, dispatch);

  const saveTaskToLocalStorage = (taskData) => {
    localStorage.setItem('savedTaskInProcess', JSON.stringify(taskData));
  };

  useEffect(() => {
    const savedTask = JSON.parse(localStorage.getItem('savedTaskInProcess'));
    if (savedTask) {
      loadTaskFromLocalStorage(savedTask);
      return;
    }

    const { githubId } = store.getState().loginReducer;
    addAuthor(githubId);
    const data = store.getState().taskReducer;

    let taskId = '';
    api.createTaskHeader({ githubId, data }).then((res) => {
      taskId = res.id;
      createTask(taskId);
      saveTaskToLocalStorage(data);
    });
  });

  useEffect(() => {
    return () => {
      const data = store.getState().taskReducer;
      saveTaskToLocalStorage(data);
    };
  }, []);

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
