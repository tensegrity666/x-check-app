/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SelfGrade from './self-grade';
import { TasksApi } from '../../services/rest-api';

import store from '../../redux/store';
import * as actions from '../../redux/actions';

const SelfGradeContainer = () => {
  const api = new TasksApi();
  const [loading, setloading] = useState(false);
  const history = useHistory();

  const { dispatch } = store;
  const { copyTaskToState, rateTaskItem } = bindActionCreators(
    actions,
    dispatch
  );

  const data = useSelector(({ selfGradeReducer }) => selfGradeReducer);

  const handleSelectChange = (id, category, value) => {
    switch (value) {
      case 'not':
        console.log(id, category, value);
        rateTaskItem({ id, rate: 0 });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setloading(true);
    api.getTask('simple-task-v3').then((res) => {
      copyTaskToState(res[0]);
      setloading(false);
    });
  }, []);

  return (
    <SelfGrade
      handleSelectChange={handleSelectChange}
      data={data}
      loading={loading}
      history={history}
    />
  );
};

export default SelfGradeContainer;
