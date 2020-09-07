/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { List, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import styles from './index.module.css';

const TaskList = ({ taskItems, removeTaskItem }) => {
  const { list, listItem } = styles;

  return (
    <>
      <List
        className={list}
        header={<h2>Criteria:</h2>}
        bordered
        dataSource={taskItems}
        renderItem={(item) => (
          <List.Item className={listItem}>
            <List.Item.Meta
              title={`${item.category} ${item.currentScore}`}
              description={item.description}
            />
            <Button
              onClick={() => removeTaskItem(item.id)}
              icon={<DeleteOutlined />}
              danger
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
