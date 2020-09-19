import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from 'antd';

import tasksList from './mockTasksList.json';
import TasksList from './tasks-list';

const { Title } = Typography;

const Tasks = () => {
  const history = useHistory();

  const handleProceedToTask = (taskId) => {
    history.push(`/tasks${taskId}`);
  };

  return (
    <div>
      <Typography>
        <Title>Список задач</Title>
      </Typography>
      <TasksList tasks={tasksList} handleProceedToTask={handleProceedToTask} />
    </div>
  );
};

export default Tasks;
