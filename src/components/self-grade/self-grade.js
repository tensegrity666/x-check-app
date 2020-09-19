import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tag, Space, Select, Input } from 'antd';

const onChange = (e) => {
  // eslint-disable-next-line no-console
  console.log(e);
};

const SelfGrade = ({ data, handleChange }) => {
  const { TextArea } = Input;
  const { Option } = Select;
  const { Column, ColumnGroup } = Table;

  return (
    <Table dataSource={data.items}>
      <ColumnGroup
        title={`Name of task: ${data.taskTitle}, deadline: ${data.deadline}, maximum score: ${data.totalScore}`}>
        <Column title="Max. score of item" dataIndex="currentScore" key="id" />
        <Column title="Your score of item" dataIndex="currentScore" />
        <Column
          title="Category"
          dataIndex="category"
          key="id"
          render={(category) => (
            <Tag color="blue" key={category}>
              {category}
            </Tag>
          )}
        />
      </ColumnGroup>
      <Column title="Description" dataIndex="description" key="id" />
      <Column
        title="Add comment"
        render={() => (
          <TextArea
            placeholder="textarea with clear icon"
            allowClear
            onChange={onChange}
          />
        )}
      />
      <Column
        title="Result"
        render={() => (
          <Space size="middle">
            <span>Выполнено:</span>

            <Select
              defaultValue=""
              style={{ width: 120 }}
              onChange={handleChange}>
              <Option value="not">Not Implemented</Option>
              <Option value="part">Partially Implemented</Option>
              <Option value="complete">Completed</Option>
            </Select>
          </Space>
        )}
      />
    </Table>
  );
};

SelfGrade.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SelfGrade;
