import React from 'react';
import { bindActionCreators } from 'redux';
import { Tag, Space, Input, Select } from 'antd';

import store from '../../redux/store';
import * as actions from '../../redux/actions';

const { TextArea } = Input;
const { Option } = Select;

const { dispatch } = store;
const { rateTaskItem } = bindActionCreators(actions, dispatch);

const handleChange = (value) => {
  switch (value) {
    case 'not':
      rateTaskItem(10);
      break;
    default:
      break;
  }
};

const onChange = (e) => {
  // eslint-disable-next-line no-console
  console.log(e);
};

const columns = [
  {
    title: 'Score',
    dataIndex: 'score',
  },
  {
    title: 'Min',
    dataIndex: 'minScore',
  },
  {
    title: 'Max',
    dataIndex: 'maxScore',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    render: (category) => (
      <Tag color={category === 'Fines' ? 'volcano' : 'blue'}>
        {category.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Add comment',
    render: () => (
      <TextArea
        placeholder="Leave a comment..."
        allowClear
        onChange={(e) => onChange(e)}
      />
    ),
  },
  {
    title: 'Result',
    render: () => (
      <Space size="middle">
        <span>Done:</span>
        <Select
          defaultValue=""
          style={{ width: 120 }}
          onChange={(value) => handleChange(value)}>
          <Option value="not">No</Option>
          <Option value="part">Partially</Option>
          <Option value="complete">Fully</Option>
        </Select>
      </Space>
    ),
  },
];

export default columns;
