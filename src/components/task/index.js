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

  const [modalVisible, setModalVisible] = useState(true);
  const [jsonTask, setJsonTask] = useState('');

  const api = new TaskApi();

  const { dispatch } = store;
  const {
    createTask,
    loadTaskFromLocalStorage,
    addAuthor,
  } = bindActionCreators(actions, dispatch);

  useEffect(() => {
    setJsonTask('TEST TEST TEST');

    if (localStorage.getItem('savedTaskInProcess')) {
      const savedTask = JSON.parse(localStorage.getItem('savedTaskInProcess'));
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
      localStorage.setItem('savedTaskInProcess', JSON.stringify(data));
    });
  }, [addAuthor, api, loadTaskFromLocalStorage, createTask]);

  return (
    <Layout className={wrapper}>
      <TaskHeaderContainer />
      <Searcher />
      <Content className={content}>
        <ModalWindow
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          jsonTask={jsonTask}
        />
        <TaskListContainer />
      </Content>
      <AddNewItemContainer />
    </Layout>
  );
};

export default Task;
