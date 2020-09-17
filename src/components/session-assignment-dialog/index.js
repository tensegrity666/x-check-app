import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, InputNumber, Space, Table } from 'antd';

import styles from './index.module.css';
import {
  tableColumns,
  populateRowsWithKeys,
  dynamicSort,
} from './table-helpers';
import { RevReqApi } from '../../services/rest-api';
import getAssignments from './assignment-helper';
import ASSIGNEES from './constants';

import store from '../../redux/store';
import * as actions from '../../redux/actions';

const SessionAssignmentDialog = () => {
  const [attendees, setAttendees] = useState([]);
  const [isAssignmentRequested, setAssignmentRequest] = useState(false);
  const [assigneesNumber, setAssigneesNumber] = useState(
    ASSIGNEES.DEFAULT_NUMBER
  );

  const reviewRequests = useSelector(
    ({ reviewRequestsReducer }) => reviewRequestsReducer.reviewRequests
  );

  const { container, content, controls } = styles;
  const { dispatch } = store;
  const { fetchReviewRequestsSuccess } = bindActionCreators(actions, dispatch);

  const api = new RevReqApi();

  const assignAttendees = async () => {
    if (reviewRequests.length === 0) {
      const result = await api.getRevReqBySession('rss2020Q3react-xcheck');
      fetchReviewRequestsSuccess(result);
    }
    setAssignmentRequest(true);
  };

  const handleChange = (value) => {
    setAssigneesNumber(value);
  };

  useEffect(() => {
    if (isAssignmentRequested && reviewRequests) {
      const result = getAssignments(reviewRequests, assigneesNumber);
      result.sort(dynamicSort('githubId'));
      setAttendees(result);
    }
  }, [isAssignmentRequested, reviewRequests, assigneesNumber]);

  return (
    <section className={container}>
      <div className={content}>
        <h3>Распределение проверяющих сессии</h3>
        <Space align="center" className={controls}>
          <span>Количество проверяемых</span>
          <InputNumber
            min={ASSIGNEES.MIN_NUMBER}
            max={ASSIGNEES.MAX_NUMBER}
            value={assigneesNumber}
            onChange={handleChange}
          />

          <Button type="primary" shape="round" onClick={assignAttendees}>
            Распределить проверяющих
          </Button>
          <Button
            type="primary"
            shape="round"
            disabled={attendees.length === 0}>
            Сохранить изменения
          </Button>
        </Space>
        <Table
          columns={tableColumns}
          dataSource={populateRowsWithKeys(attendees)}
        />
      </div>
    </section>
  );
};

export default SessionAssignmentDialog;
