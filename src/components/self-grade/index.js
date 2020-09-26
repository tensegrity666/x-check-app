/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import SelfGrade from './self-grade';
import { TasksApi, RevReqApi } from '../../services/rest-api';
import { CATEGORIES, RATES } from './constants';

import store from '../../redux/store';
import * as actions from '../../redux/actions';

const SelfGradeContainer = () => {
  const tasksApi = new TasksApi();
  const reviewApi = new RevReqApi();

  const taskId = useParams();

  const { fines } = CATEGORIES;
  const { nope, partially, fully } = RATES;

  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [prLink, setPrLink] = useState('');
  const [deployLink, setDeployLink] = useState('');

  const history = useHistory();

  const { dispatch } = store;
  const {
    copyTaskToState,
    rateTask,
    commentTaskItem,
    addSummaryComment,
  } = bindActionCreators(actions, dispatch);

  const state = useSelector(({ selfGradeReducer }) => selfGradeReducer);

  const onTextChange = (value) => {
    setInputValue(value);
  };

  const onSelfGradeSubmit = () => {
    const { githubId } = store.getState().loginReducer;
    const { items } = store.getState().selfGradeReducer;

    addSummaryComment(inputValue);

    const data = {
      url_pr: prLink,
      url_deploy: deployLink,
      author: githubId,
      task: taskId.id,
      selfGrade: items,
    };

    reviewApi.createRevReq({ githubId, data });
  };

  const handleSelectChange = (id, maxScore, minScore, category, value) => {
    switch (value) {
      case nope:
        if (category === fines) {
          rateTask({ id, rate: minScore });
          break;
        }
        rateTask({ id, rate: 0 });
        break;

      case partially:
        if (category === fines) {
          rateTask({ id, rate: Math.trunc(minScore / 2) });
          break;
        }
        rateTask({ id, rate: Math.trunc(maxScore / 2) });
        break;

      case fully:
        if (category === fines) {
          rateTask({ id, rate: 0 });
          break;
        }
        rateTask({ id, rate: maxScore });
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    setLoading(true);
    tasksApi.getTask(taskId.id).then((res) => {
      copyTaskToState(res[0]);
      setLoading(false);
    });
  }, []);

  return (
    <SelfGrade
      handleSelectChange={handleSelectChange}
      state={state}
      loading={loading}
      history={history}
      commentTaskItem={commentTaskItem}
      inputValue={inputValue}
      onTextChange={onTextChange}
      onSelfGradeSubmit={onSelfGradeSubmit}
      prLink={prLink}
      deployLink={deployLink}
      setPrLink={setPrLink}
      setDeployLink={setDeployLink}
    />
  );
};

export default SelfGradeContainer;
