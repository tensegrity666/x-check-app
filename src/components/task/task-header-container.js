/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';

import moment from 'moment';
import TaskHeader from './task-header';

import store from '../../redux/store';
import * as actions from '../../redux/actions';

import TaskApi from '../../services/rest-api/tasks-api';

const TaskHeaderContainer = () => {
  const api = new TaskApi();

  const [nameEditorValue, setNameEditorValue] = useState(null);
  const [dateOfDeadline, setDateOfDeadline] = useState(null);
  const history = useHistory();

  const taskState = useSelector(({ taskReducer }) => taskReducer);

  const { dispatch } = store;
  const { editTaskTitle, editDeadline } = bindActionCreators(actions, dispatch);

  const onInputChange = (event) => {
    setNameEditorValue(event.target.value);
  };

  const onDateChange = (value) => {
    setDateOfDeadline(value);
  };

  const onSaveTask = () => {
    const data = store.getState().taskReducer;
    const { githubId } = store.getState().loginReducer;

    // eslint-disable-next-line no-console
    api.createTaskHeader({ githubId, data }).then((res) => console.log(res));

    localStorage.setItem('savedTaskInProcess', JSON.stringify(data));
  };

  useEffect(() => {
    const formattedDate = moment(dateOfDeadline).format('DD.MM.YYYY');

    editTaskTitle(nameEditorValue);
    editDeadline(formattedDate);
  }, [nameEditorValue, dateOfDeadline]);

  return (
    <TaskHeader
      history={history}
      onInputChange={onInputChange}
      onSaveTask={onSaveTask}
      taskState={taskState}
      nameEditorValue={nameEditorValue}
      dateOfDeadline={dateOfDeadline}
      onDateChange={onDateChange}
    />
  );
};

export default TaskHeaderContainer;
