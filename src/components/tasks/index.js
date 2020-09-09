import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, List } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';

import tasksList from './mockTasksList.json';
import styles from './index.module.css';

const { Title } = Typography;

const Tasks = () => {
  const history = useHistory();

  const handleProceedToTask = (taskId) => {
    history.push(`/tasks${taskId}`);
  };

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

export default Tasks;
