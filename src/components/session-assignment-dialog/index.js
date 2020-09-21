import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  const isLoading = useSelector(
    ({ reviewRequestsReducer }) => reviewRequestsReducer.isLoading
  );

  const { container, content, controls } = styles;
  const { dispatch } = store;
  const {
    fetchReviewRequestsSuccess,
    fetchReviewRequestsBegin,
  } = bindActionCreators(actions, dispatch);

  const api = new RevReqApi();

  const generateAssignments = (requestsList, number) => {
    const result = getAssignments(requestsList, number);
    result.sort(dynamicSort('githubId'));
    setAttendees(result);
  };
  const { id } = useParams();

  const assignAttendees = async () => {
    if (reviewRequests.length === 0) {
      fetchReviewRequestsBegin();
      const result = await api.getRevReqByCrossCheckId(id);
      fetchReviewRequestsSuccess(result);
    }
    if (isAssignmentRequested) {
      generateAssignments(reviewRequests, assigneesNumber);
    }
    setAssignmentRequest(true);
  };

  const handleChange = (value) => {
    setAssigneesNumber(value);
  };

  useEffect(() => {
    if (isAssignmentRequested && reviewRequests) {
      generateAssignments(reviewRequests, assigneesNumber);
    }
  }, [isAssignmentRequested, reviewRequests, assigneesNumber]);

  return (
    <section className={container}>
      <div className={content}>
        <h3>Assignment of session attendees</h3>
        <Space align="center" className={controls}>
          <span>Reviewed students number</span>
          <InputNumber
            min={ASSIGNEES.MIN_NUMBER}
            max={ASSIGNEES.MAX_NUMBER}
            value={assigneesNumber}
            onChange={handleChange}
          />

          <Button type="default" onClick={assignAttendees} disabled={isLoading}>
            {attendees.length === 0 ? 'Assign attendees' : 'Reassign'}
          </Button>

          <Button type="default" disabled={attendees.length <= 1}>
            Save attendees
          </Button>
        </Space>
        <Table
          loading={isLoading}
          columns={tableColumns}
          dataSource={populateRowsWithKeys(attendees)}
        />
      </div>
    </section>
  );
};

export default SessionAssignmentDialog;
