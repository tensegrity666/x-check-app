import React from 'react';
import { Typography, List } from 'antd';
import { Link as RouterLink } from 'react-router-dom';

import tasksList from './mockTasksList.json';
import styles from './index.module.css';

const { Title } = Typography;

const Tasks = () => {
  return (
    <div>
      <Typography>
        <Title>Tasks</Title>
      </Typography>
      <section>
        <List
          dataSource={tasksList}
          renderItem={({ id, title, state }) => (
            <List.Item>
              <RouterLink to={`/tasks/${id}`} className={styles.tasksLink}>
                {state !== 'PUBLISHED' && (
                  <Typography.Text mark>{`[${state}] `}</Typography.Text>
                )}
                {title}
              </RouterLink>
            </List.Item>
          )}
        />
      </section>
    </div>
  );
};

export default Tasks;
