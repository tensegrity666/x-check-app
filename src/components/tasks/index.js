import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Typography } from 'antd';

import TasksList from './tasks-list';

import store from '../../redux/store';
import * as actions from '../../redux/actions';

const Tasks = () => {
  const { Title } = Typography;
  const { dispatch } = store;
  const { fetchTasks } = bindActionCreators(actions, dispatch);

  const history = useHistory();
  const tasks = useSelector(({ tasksListReducer }) => tasksListReducer.tasks);
  const isLoading = useSelector(
    ({ tasksListReducer }) => tasksListReducer.isLoading
  );

  const handleProceedToTask = (taskId) => {
    history.push(`/tasks${taskId}`);
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Typography>
        <Title>Список задач</Title>
      </Typography>
      <TasksList
        tasks={tasks}
        handleProceedToTask={handleProceedToTask}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Tasks;
