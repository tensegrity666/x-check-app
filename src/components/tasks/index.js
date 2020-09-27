/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { TasksApi } from '../../services/rest-api';
import store from '../../redux/store';

import Tasks from './tasks';

const TasksContainer = () => {
  const tasksApi = new TasksApi();
  const [loading, setLoading] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);

  const [tasksList, setTasksList] = useState([]);

  const { roles } = store.getState().loginReducer;

  useEffect(() => {
    if (roles.includes('author')) {
      setIsAuthor(true);
    }

    setLoading(true);
    tasksApi.getTasksAll().then((res) => {
      setTasksList(res);
      setLoading(false);
    });
  }, []);

  return <Tasks tasksList={tasksList} loading={loading} isAuthor={isAuthor} />;

};

export default TasksContainer;
