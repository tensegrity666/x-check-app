import React from 'react';
import PropTypes from 'prop-types';
import { Typography, List } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';

import styles from './index.module.css';

const TasksList = ({ tasks, handleProceedToTask, isLoading }) => {
  return (
    <section>
      <List
        loading={isLoading}
        dataSource={tasks}
        renderItem={({ id, taskTitle, dateOfCreate, state }) => (
          <List.Item>
            <List.Item.Meta
              className={styles.tasksMeta}
              onClick={() => handleProceedToTask(id)}
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
              description={`дата создания: ${dateOfCreate}`}
            />
          </List.Item>
        )}
      />
    </section>
  );
};

TasksList.propTypes = {
  handleProceedToTask: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      taskTitle: PropTypes.string,
      dateOfCreate: PropTypes.string,
      state: PropTypes.string,
    })
  ),
  isLoading: PropTypes.bool,
};

TasksList.defaultProps = {
  tasks: [],
  isLoading: false,
};

export default TasksList;
