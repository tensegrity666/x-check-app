/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import moment from 'moment';
import TaskHeader from './task-header';

import store from '../../redux/store';
import * as actions from '../../redux/actions';

import TaskApi from '../../services/rest-api/tasks-api';

const TaskHeaderContainer = ({ setModalVisible }) => {
  const api = new TaskApi();
  const history = useHistory();

  const [nameEditorValue, setNameEditorValue] = useState(null);
  const [dateOfDeadline, setDateOfDeadline] = useState(null);
  const [loading, setLoading] = useState(false);

  const taskState = useSelector(({ taskReducer }) => taskReducer);

  const { dispatch } = store;
  const { editTaskTitle, editDeadline, toggleSaved } = bindActionCreators(
    actions,
    dispatch
  );

  const onInputChange = (event) => {
    setNameEditorValue(event.target.value);
  };

  const onDateChange = (value) => {
    setDateOfDeadline(value);
  };

  const onSaveTask = (isModalToggled) => {
    setLoading(true);
    toggleSaved();
    const data = store.getState().taskReducer;
    const taskId = data.id;
    const { githubId } = store.getState().loginReducer;

    api
      .editTaskHeader({ githubId, taskId, data })
      .then(() => setLoading(false));

    localStorage.setItem('savedTaskInProcess', JSON.stringify(data));

    if (isModalToggled) {
      setModalVisible(true);
    }
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
      loading={loading}
    />
  );
};

TaskHeaderContainer.propTypes = {
  setModalVisible: PropTypes.func.isRequired,
};

export default TaskHeaderContainer;
