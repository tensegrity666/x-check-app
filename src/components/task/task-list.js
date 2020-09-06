import React from 'react';
import { useSelector } from 'react-redux';
import { List } from 'antd';

const TaskList = () => {
  const taskItems = useSelector(({ taskReducer }) => taskReducer.items);

  return (
    <>
      <List
        header={<h2>Список заданий:</h2>}
        bordered
        dataSource={taskItems}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={`${item.category} ${item.currentScore}`}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default TaskList;
