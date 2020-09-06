/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { List, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const TaskList = ({ taskItems, removeTaskItem }) => {
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
            <Button
              onClick={() => removeTaskItem(item.id)}
              icon={<DeleteOutlined />}
              danger
              title={item.id}
            />
          </List.Item>
        )}
      />
    </>
  );
};

TaskList.propTypes = {
  removeTaskItem: PropTypes.func.isRequired,
  taskItems: PropTypes.array.isRequired,
};

export default TaskList;
