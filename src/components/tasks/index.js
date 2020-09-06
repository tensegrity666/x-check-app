import React from 'react';
import { Typography, List } from 'antd';
import { Link as RouterLink } from 'react-router-dom';

import tasksList from './mockTasksList.json';

const { Title } = Typography;

const Tasks = () => {
  return (
    <>
      <Typography>
        <Title>Tasks</Title>
      </Typography>
      <section>
        <List
          dataSource={tasksList}
          renderItem={({ id, title, state }) => (
            <List.Item>
              <RouterLink to={`/tasks/${id}`}>
                {state !== 'PUBLISHED' && (
                  <Typography.Text mark>{`[${state}] `}</Typography.Text>
                )}
                {title}
              </RouterLink>
            </List.Item>
          )}
        />
      </section>
    </>
  );
};

export default Tasks;
