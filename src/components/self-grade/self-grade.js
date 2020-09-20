import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table, Tag, Space, Select, Input, PageHeader, Layout } from 'antd';

const onChange = (e) => {
  // eslint-disable-next-line no-console
  console.log(e);
};

const SelfGrade = ({ data, handleChange }) => {
  const { Content } = Layout;
  const { TextArea } = Input;
  const { Option } = Select;
  const { Column, ColumnGroup } = Table;
  const history = useHistory();

  return (
    <Layout>
      <PageHeader
        style={{ margin: ' 0 50px' }}
        onBack={() => history.goBack()}
        title={`${data.taskTitle}, deadline: ${data.deadline}`}
        subTitle={`maximum score: ${data.totalScore}`}
      />
      <Content style={{ margin: ' 0 50px' }}>
        <Table dataSource={data.items}>
          <ColumnGroup title={`maximum score: ${data.totalScore}`}>
            <Column title="Score /" dataIndex="currentScore" />
            <Column title="Max" dataIndex="currentScore" key="id" />
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
                <span>Completed:</span>

                <Select
                  defaultValue=""
                  style={{ width: 120 }}
                  onChange={handleChange}>
                  <Option value="not">No</Option>
                  <Option value="part">Partially</Option>
                  <Option value="complete">Fully</Option>
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
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SelfGrade;
