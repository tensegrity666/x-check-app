import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { bindActionCreators } from 'redux';

import ModalWindow from '../modal-window';

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

  const [modalVisible, setModalVisible] = useState(false);

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
    }

    return () => {
      const data = store.getState().taskReducer;
      saveTaskToLocalStorage(data);
    };
  });

  useEffect(() => {
    const { githubId } = store.getState().loginReducer;
    addAuthor(githubId);

    const data = store.getState().taskReducer;
    if (!data.id) {
      api.createTaskHeader({ githubId, data }).then((res) => {
        const taskId = res.id;
        if (taskId) {
          createTask(taskId);
          data.id = taskId;
        }

        saveTaskToLocalStorage(data);
      });
    }
  });

  return (
    <Layout className={wrapper}>
      <TaskHeaderContainer setModalVisible={setModalVisible} />
      <Searcher />
      <Content className={content}>
        <ModalWindow
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <TaskListContainer />
      </Content>
      <AddNewItemContainer />
    </Layout>
  );
};

export default Task;
