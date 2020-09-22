/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import SelfGrade from './self-grade';
import { TasksApi } from '../../services/rest-api';
import columns from './columns';

import store from '../../redux/store';
import * as actions from '../../redux/actions';

const SelfGradeContainer = () => {
  const api = new TasksApi();
  const [data, setData] = useState({});

  const { dispatch } = store;
  const { copyTaskToState } = bindActionCreators(actions, dispatch);

  useEffect(() => {
    api.getTask('simple-task-v3').then((res) => {
      setData(res[0]);
      copyTaskToState(res[0]);
    });
  }, []);

  return <SelfGrade data={data} columns={columns} />;
};

export default SelfGradeContainer;
