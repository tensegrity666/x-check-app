import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PageHeader, Tag, Button, Statistic, Row } from 'antd';

const TaskHeader = () => {
  const total = useSelector(({ taskReducer }) => taskReducer.totalScore);
  const date = useSelector(({ taskReducer }) => taskReducer.dateOfCreate);
  const title = useSelector(({ taskReducer }) => taskReducer.taskTitle);
  const history = useHistory();

  return (
    <>
      <PageHeader
        onBack={() => history.goBack()}
        title="Task Editor"
        tags={<Tag color="blue">DRAFT</Tag>}
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
          <Statistic title="Name of task" value={title} />
          <Statistic
            title="Total score"
            value={total}
            style={{
              margin: '0 32px',
            }}
          />
          <Statistic title="Сreation date" value={date} />
        </Row>
      </PageHeader>
    </>
  );
};

export default TaskHeader;
