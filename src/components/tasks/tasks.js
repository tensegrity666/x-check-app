/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { Typography, List, Button, Row } from 'antd';
import { ProfileOutlined, FormOutlined } from '@ant-design/icons';

import styles from './index.module.css';

const Tasks = ({ tasksList, loading, isAuthor, history }) => {
  const { tasksMeta } = styles;

  return (
    <List
      style={{ width: '100%', marginLeft: '50px' }}
      loading={loading}
      dataSource={tasksList}
      renderItem={({ id, taskTitle, dateOfCreate, state }) => (
        <List.Item>
          <Row justify="start">
            <List.Item.Meta
              className={tasksMeta}
              avatar={<ProfileOutlined style={{ fontSize: '30px' }} />}
              title={
                state !== 'PUBLISHED' ? (
                  <>
                    <Typography.Text mark>{`[${state}] `}</Typography.Text>
                    {taskTitle}
                  </>
                ) : (
                  taskTitle
                )
              }
              description={`created: ${dateOfCreate}`}
            />
            <Button
              disabled={isAuthor}
              icon={<FormOutlined />}
              type="dotted"
              onClick={() => history.push(`/self/${id}`)}>
              {isAuthor ? 'Please, login as a student' : 'Start self-grade'}
            </Button>
          </Row>
        </List.Item>
      )}
    />
  );
};

Tasks.propTypes = {
  tasksList: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  isAuthor: PropTypes.bool.isRequired,
};

export default Tasks;
