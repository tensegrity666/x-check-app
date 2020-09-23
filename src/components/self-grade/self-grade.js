/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { Table, PageHeader, Layout, Tag, Input, Select, Space } from 'antd';

const SelfGrade = ({ data, loading, handleSelectChange, history }) => {
  const { Content } = Layout;
  const { TextArea } = Input;
  const { Option } = Select;
  const { Column } = Table;

  const { items, taskTitle, deadline, totalScore } = data;

  return (
    <Layout>
      <PageHeader
        onBack={() => history.goBack()}
        title={`${taskTitle}, deadline: ${deadline}`}
        subTitle={`maximum score: ${totalScore}`}
      />
      <Content style={{ margin: '0 50px' }}>
        <Table rowKey="uid" loading={loading} dataSource={items}>
          <Column key="1" title="Score" dataIndex="score" />
          <Column key="2" title="Min" dataIndex="minScore" />
          <Column key="3" title="Max" dataIndex="maxScore" />
          <Column
            key="4"
            title="Category"
            dataIndex="category"
            render={(category) => (
              <Tag color={category === 'Fines' ? 'volcano' : 'blue'}>
                {category.toUpperCase()}
              </Tag>
            )}
          />
          <Column key="5" title="Description" dataIndex="description" />
          <Column
            key="6"
            title="Add comment"
            render={(record) => (
              <TextArea
                placeholder="Leave a comment..."
                allowClear
                onChange={({ target: { value } }) =>
                  console.log(record.id, value)
                }
              />
            )}
          />
          <Column
            key="7"
            title="Result"
            render={(record) => (
              <Space size="middle">
                <span>{record.category === 'Fines' ? 'Fines:' : 'Done: '}</span>
                <Select
                  defaultValue=""
                  style={{ width: 120 }}
                  onChange={(value) =>
                    handleSelectChange(record.id, record.category, value)
                  }>
                  <Option value="not">
                    {record.category === 'Fines' ? 'Not working' : 'No'}
                  </Option>
                  <Option value="part">Partially</Option>
                  <Option value="complete">
                    {record.category === 'Fines' ? 'Without fines' : 'Fully'}
                  </Option>
                </Select>
              </Space>
            )}
          />
        </Table>
      </Content>
    </Layout>
  );
};

SelfGrade.propTypes = {
  data: PropTypes.PropTypes.object.isRequired,
  history: PropTypes.PropTypes.object.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  loading: PropTypes.PropTypes.bool.isRequired,
};

export default SelfGrade;
