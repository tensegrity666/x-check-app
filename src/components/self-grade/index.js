/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';

import SelfGrade from './self-grade';
import { TasksApi } from '../../services/rest-api';

function handleChange(value) {
  // eslint-disable-next-line no-console
  console.log(`selected ${value}`);
}

const SelfGradeContainer = () => {
  const api = new TasksApi();
  const [data, setData] = useState({});

  useEffect(() => {
    api.getTask('simple-task-v3').then((res) => setData(res[0]));
  }, []);

  return <SelfGrade data={data} handleChange={handleChange} />;
};

export default SelfGradeContainer;
