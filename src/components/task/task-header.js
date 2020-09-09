/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';
import { PageHeader, Tag, Button, Statistic, Row, Popover, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import store from '../../redux/store';
import * as actions from '../../redux/actions';
import styles from './index.module.css';

const TaskHeader = () => {
  const { statsHeading } = styles;
  const [nameEditorValue, setNameEditorValue] = useState(null);

  const { total, dateOfCreate, taskTitle, author, state } = useSelector(
    ({ taskReducer }) => taskReducer
  );
  const history = useHistory();

  const { dispatch } = store;
  const { editTaskTitle } = bindActionCreators(actions, dispatch);

  const onInputChange = (event) => {
    setNameEditorValue(event.target.value);
  };

  useEffect(() => {
    editTaskTitle(nameEditorValue);
  }, [nameEditorValue]);

  return (
    <>
      <PageHeader
        onBack={() => history.goBack()}
        title="Task Editor"
        tags={<Tag color="blue">{state}</Tag>}
        subTitle="status"
        extra={[
          <Button danger key="3">
            Delete
          </Button>,
          <Button key="2">Cancel</Button>,
          <Button key="1" type="primary">
            Save
          </Button>,
        ]}>
        <Row>
          <Statistic
            title="Name of task"
            value={taskTitle || 'Unnamed task'}
            suffix={
              <Popover
                content={
                  <Input
                    value={nameEditorValue}
                    onChange={(event) => onInputChange(event)}
                  />
                }
                title="Edit name of task"
                trigger="click">
                <Button shape="circle">
                  <EditOutlined />
                </Button>
              </Popover>
            }
          />
          <Statistic
            className={statsHeading}
            title="Author"
            value={author || 'Anonymous'}
          />
          <Statistic
            className={statsHeading}
            title="Total score"
            value={total}
          />
          <Statistic
            className={statsHeading}
            title="Сreation date"
            value={dateOfCreate || ' '}
          />
        </Row>
      </PageHeader>
    </>
  );
};

export default TaskHeader;
