import React from 'react';
import PropTypes from 'prop-types';
import { Typography, List } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';

import styles from './index.module.css';

const { Title } = Typography;

const Tasks = ({ handleProceedToTask, tasksList }) => {
  return (
    <div>
      <Typography>
        <Title>Список задач</Title>
      </Typography>
      <section>
        <List
          dataSource={tasksList}
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
    </div>
  );
};

Tasks.propTypes = {
  handleProceedToTask: PropTypes.func.isRequired,
  tasksList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Tasks;
