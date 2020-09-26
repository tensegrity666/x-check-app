import React from 'react';
import TasksContainer from '../components/tasks';
import SideMenu from '../components/side-menu';
import Header from '../components/header';

const TasksPage = () => {
  return (
    <>
      <Header />
      <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
        <SideMenu />
        <TasksContainer />
      </div>
    </>
  );
};

export default TasksPage;
