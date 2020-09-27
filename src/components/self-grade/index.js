
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
=======
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
