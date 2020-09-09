import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';
import { PageHeader, Tag, Button, Statistic, Row, Popover, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import store from '../../redux/store';
import * as actions from '../../redux/actions';

const TaskHeader = () => {
  const [nameEditorValue, setNameEditorValue] = useState(null);

  const total = useSelector(({ taskReducer }) => taskReducer.totalScore);
  const date = useSelector(({ taskReducer }) => taskReducer.dateOfCreate);
  const title = useSelector(({ taskReducer }) => taskReducer.taskTitle);
  const author = useSelector(({ taskReducer }) => taskReducer.author);
  const status = useSelector(({ taskReducer }) => taskReducer.state);
  const history = useHistory();

  const { dispatch } = store;
  const { editTaskTitle } = bindActionCreators(actions, dispatch);

  const onInputChange = (event) => {
    setNameEditorValue(event.target.value);
    editTaskTitle(nameEditorValue);
  };

  return (
    <>
      <PageHeader
        onBack={() => history.goBack()}
        title="Task Editor"
        tags={<Tag color="blue">{status}</Tag>}
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
            value={title || 'Unnamed task'}
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
            title="Author"
            value={author || 'Anonymous'}
            style={{
              margin: '0 32px',
            }}
          />
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
