import React from 'react';
import PropTypes from 'prop-types';
import { Typography, List, Button, Row } from 'antd';
import { ProfileOutlined, FormOutlined } from '@ant-design/icons';

import styles from './index.module.css';

// eslint-disable-next-line no-unused-vars
const Tasks = ({ handleProceedToTask, tasksList, loading }) => {
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
              // onClick={() => handleProceedToTask(id)}
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
            <Button icon={<FormOutlined />} type="dotted" href={`/self/${id}`}>
              Start self-grade
            </Button>
          </Row>
        </List.Item>
      )}
    />
  );
};

Tasks.propTypes = {
  handleProceedToTask: PropTypes.func.isRequired,
  tasksList: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Tasks;
