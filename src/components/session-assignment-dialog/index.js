import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Space, Table } from 'antd';

import styles from './index.module.css';
import {
  tableColumns,
  populateRowsWithKeys,
  dynamicSort,
} from './table-helpers';
import getAssignments from './assignment-helper';
import reviewRequestsMock from './mock-review-requests.json';

import store from '../../redux/store';
import * as actions from '../../redux/actions';

const SessionAssignmentDialog = () => {
  const [attendees, setAttendees] = useState([]);
  const [isAssignmentRequested, setAssignmentRequest] = useState(false);

  const reviewRequests = useSelector(
    ({ reviewRequestsReducer }) => reviewRequestsReducer.reviewRequests
  );

  const { container, content, controls } = styles;
  const { dispatch } = store;
  const { fetchReviewRequestsSuccess } = bindActionCreators(actions, dispatch);

  const assignAttendees = () => {
    if (!reviewRequests) {
      // TODO: Add API fetching
      fetchReviewRequestsSuccess(reviewRequestsMock);
    }
    setAssignmentRequest(true);
  };

  useEffect(() => {
    if (isAssignmentRequested && reviewRequests) {
      const result = getAssignments(reviewRequestsMock, 4);
      result.sort(dynamicSort('githubId'));
      setAttendees(result);
    }
  }, [isAssignmentRequested, reviewRequests]);

  return (
    <section className={container}>
      <div className={content}>
        <h3>Распределение проверяющих сессии</h3>
        <Space align="center" className={controls}>
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
