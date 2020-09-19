import React from 'react';

import SelfGrade from './self-grade';

const data = {
  author: 'tensegrity666',
  taskTitle: 'TEST TASK 1',
  state: 'DRAFT',

  totalScore: 295,
  items: [
    {
      id: 'task-item-kfa7dawp',
      category: 'Fines',
      description: 'test item fail',
      currentScore: -40,
    },
    {
      id: 'task-item-kfa7d6w9',
      category: 'Fines',
      description: 'test item fail',
      currentScore: -20,
    },
    {
      id: 'task-item-kfa7cue1',
      category: 'Hacker Scope',
      description: 'test item hacker 2',
      currentScore: 100,
    },
    {
      id: 'task-item-kfa7cn22',
      category: 'Hacker Scope',
      description: 'test item hacker 1',
      currentScore: 80,
    },
    {
      id: 'task-item-kfa7cf4h',
      category: 'Advanced Scope',
      description: 'test item advanced 2',
      currentScore: 60,
    },
    {
      id: 'task-item-kfa7c4zt',
      category: 'Advanced Scope',
      description: 'test item advanced 1',
      currentScore: 45,
    },
    {
      id: 'task-item-kfa7bvtt',
      category: 'Basic Scope',
      description: 'test item basic 3',
      currentScore: 30,
    },
    {
      id: 'task-item-kfa7br2p',
      category: 'Basic Scope',
      description: 'test item basic 2',
      currentScore: 25,
    },
    {
      id: 'task-item-kfa7bj4y',
      category: 'Basic Scope',
      description: 'test item basic 1',
      currentScore: 15,
    },
  ],
  deadline: '30.09.2020',
};

function handleChange(value) {
  // eslint-disable-next-line no-console
  console.log(`selected ${value}`);
}

const SelfGradeContainer = () => {
  return <SelfGrade data={data} handleChange={handleChange} />;
};

export default SelfGradeContainer;
