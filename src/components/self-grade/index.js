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
  const [reqId, setReqId] = useState('');
  const [isReqCreated, setIsReqCreated] = useState(false);

  const history = useHistory();

  const { githubId } = store.getState().loginReducer;

  const { dispatch } = store;
  const {
    copyTaskToState,
    rateTask,
    commentTaskItem,
    addSummaryComment,
    changeStatus,
  } = bindActionCreators(actions, dispatch);

  const currentState = useSelector(({ selfGradeReducer }) => selfGradeReducer);

  const onTextChange = (value) => {
    setInputValue(value);
  };

  const sendRevReq = (isCreated) => {
    setLoading(true);
    const { items } = store.getState().selfGradeReducer;

    addSummaryComment(inputValue);

    const data = {
      url_pr: prLink,
      url_deploy: deployLink,
      author: githubId,
      task: taskId.id,
      selfGrade: items,
    };

    if (!isCreated) {
      reviewApi
        .createRevReq({ githubId, data })
        .then((res) => setReqId(res.id))
        .then(() => setLoading(false));

      setIsReqCreated(true);
      return;
    }

    reviewApi
      .editRevReq({ githubId, reqId, data })
      .then(() => setLoading(false));
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

  const onStatusChange = (value) => {
    const PUBLISHED_TO_DRAFT = 'PUBLISHED_TO_DRAFT';
    const DRAFT_TO_PUBLISHED = 'DRAFT_TO_PUBLISHED';

    changeStatus(value);

    switch (value) {
      case 'DRAFT':
        reviewApi.toggleRevReqState({ githubId, reqId, PUBLISHED_TO_DRAFT });
        break;
      case 'PUBLISHED':
        reviewApi.toggleRevReqState({ githubId, reqId, DRAFT_TO_PUBLISHED });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    tasksApi.getTask(taskId.id).then((res) => {
      copyTaskToState(res[0]);
    });
  }, []);

  return (
    <SelfGrade
      handleSelectChange={handleSelectChange}
      currentState={currentState}
      loading={loading}
      history={history}
      commentTaskItem={commentTaskItem}
      inputValue={inputValue}
      onTextChange={onTextChange}
      sendRevReq={sendRevReq}
      isReqCreated={isReqCreated}
      prLink={prLink}
      deployLink={deployLink}
      setPrLink={setPrLink}
      setDeployLink={setDeployLink}
      onStatusChange={onStatusChange}
    />
  );
};

export default SelfGradeContainer;
