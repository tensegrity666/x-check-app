import React from 'react';
import PropTypes from 'prop-types';

import { List, Divider, Select } from 'antd';

const { Option } = Select;

function handleChange(value) {
  // eslint-disable-next-line no-console
  console.log(`selected ${value}`);
}

const TaskList = ({ todos }) => {
  return (
    <>
      <Divider orientation="left">Tasks</Divider>
      <List
        header={<h2>Header</h2>}
        bordered
        dataSource={todos}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.id} description={item.text} />
            <Select
              defaultValue="basic"
              style={{ width: 140 }}
              onChange={handleChange}>
              <Option value="basic">Basic scope</Option>
              <Option value="extra">Extra scope</Option>
              <Option value="hacker">Hacker scope</Option>
            </Select>
          </List.Item>
        )}
      />
    </>
  );
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TaskList;
