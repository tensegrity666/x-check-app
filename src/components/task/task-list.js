import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { List } from 'antd';

import ControlsGroup from './controls-group';

const TaskList = ({ taskIndex }) => {
  const taskItems = useSelector(
    ({ taskReducer }) => taskReducer[taskIndex].items
  );
  const taskCategories = useSelector(
    ({ taskReducer }) => taskReducer[taskIndex].categories
  );

  return (
    <>
      <List
        header={<h2>Header</h2>}
        bordered
        dataSource={taskItems}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.title} description={item.description} />
            <ControlsGroup
              range={item.scoreRange}
              score={item.currentScore}
              category={item.category}
              taskCategories={taskCategories}
            />
          </List.Item>
        )}
      />
    </>
  );
};

TaskList.propTypes = {
  taskIndex: PropTypes.number.isRequired,
};

export default TaskList;
