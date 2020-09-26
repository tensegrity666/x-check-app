/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TasksApi } from '../../services/rest-api';

import Tasks from './tasks';

const TasksContainer = () => {
  const tasksApi = new TasksApi();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [tasksList, setTasksList] = useState([]);

  useEffect(() => {
    setLoading(true);
    tasksApi.getTasksAll().then((res) => {
      setTasksList(res);
      setLoading(false);
    });
  }, []);

  const handleProceedToTask = (taskId) => {
    setLoading(true);
    tasksApi.getTask(taskId).then((res) => {
      // eslint-disable-next-line no-console
      console.log(res);
      setLoading(false);
    });
    history.push(`/tasks${taskId}`);
  };

  return (
    <Tasks
      handleProceedToTask={handleProceedToTask}
      tasksList={tasksList}
      loading={loading}
    />
  );
};

export default TasksContainer;
