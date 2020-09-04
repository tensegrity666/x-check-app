import React, { useState } from 'react';

import TaskHeader from './task-header';
import TaskList from './task-list';
import AddNewItem from './add-new-item';
import Searcher from './searcher';

const Task = () => {
  const [todos] = useState([
    { id: 1, text: 'eat' },
    { id: 2, text: 'sleep' },
    { id: 3, text: 'drink' },
    {
      id: 4,
      text:
        'lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum',
    },
  ]);

  return (
    <>
      <TaskHeader />
      <Searcher />
      <TaskList todos={todos} />
      <AddNewItem />
    </>
  );
};

export default Task;
