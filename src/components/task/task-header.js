/* eslint-disable react/forbid-prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import PropTypes from 'prop-types';
import {
  PageHeader,
  Tag,
  Button,
  Statistic,
  Row,
  Popover,
  Input,
  DatePicker,
  Col,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';

import styles from './index.module.css';

const TaskHeader = ({
  history,
  onInputChange,
  onSaveTask,
  nameEditorValue,
  taskState,
  onDateChange,
  dateOfDeadline,
}) => {
  const { statsHeading, datePicker } = styles;
  const {
    maxScore,
    dateOfCreate,
    taskTitle,
    author,
    state,
    deadline,
  } = taskState;

  return (
    <>
      <PageHeader
        onBack={() => history.goBack()}
        title="Task Editor"
        tags={<Tag color="blue">{state}</Tag>}
        subTitle="status"
        extra={[
          <Button size="large" key="2" type="default">
            Complete & Exit
          </Button>,
          <Button size="large" onClick={onSaveTask} key="1" type="primary">
            Save & Upload
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
            value={maxScore}
          />
          <Statistic
            className={statsHeading}
            title="Сreation date"
            value={dateOfCreate || ' '}
          />
          <Col>
            <div className="ant-statistic-title">Deadline</div>
            <Row>
              <span className="ant-statistic-content">
                {deadline || 'Choose day of Deadline'}
              </span>
              <DatePicker
                format="DD.MM.YYYY"
                value={dateOfDeadline}
                onChange={onDateChange}
                size="medium"
                className={`${datePicker} ant-statistic-content-suffix`}
              />
            </Row>
          </Col>
        </Row>
      </PageHeader>
    </>
  );
};

TaskHeader.propTypes = {
  history: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onSaveTask: PropTypes.func.isRequired,
  taskState: PropTypes.object.isRequired,
  nameEditorValue: PropTypes.string,
  dateOfDeadline: PropTypes.object,
};

TaskHeader.defaultProps = {
  nameEditorValue: '',
  dateOfDeadline: {},
};

export default TaskHeader;
