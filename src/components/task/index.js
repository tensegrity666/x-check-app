import React from 'react';

import TaskHeader from '../task-header';
import TaskList from '../task-list';
import AddNewItem from '../add-new-item';

const Task = () => {
  return (
    <>
      <TaskHeader />
      <TaskList />
      <AddNewItem />
    </>
  );
};

export default Task;
