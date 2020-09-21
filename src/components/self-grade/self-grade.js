/* eslint-disable react/forbid-prop-types */

import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table, Tag, Space, Select, Input, PageHeader, Layout } from 'antd';
import uniqid from 'uniqid';

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

  const { items, taskTitle, deadline, totalScore } = data;

  return (
    <Layout>
      <PageHeader
        onBack={() => history.goBack()}
        title={`${taskTitle}, deadline: ${deadline}`}
        subTitle={`maximum score: ${totalScore}`}
      />
      <Content style={{ margin: ' 0 50px' }}>
        <Table key={uniqid('table-')} dataSource={items}>
          <ColumnGroup title={`Maximum Score: ${totalScore}`}>
            <Column
              width="4%"
              style={{ padding: '0' }}
              title="Score"
              key={uniqid('mscore-')}
              dataIndex="maxScore"
            />
            <Column
              width="3%"
              title="Max"
              dataIndex="maxScore"
              key={uniqid('score-')}
            />
            <Column
              title="Category"
              dataIndex="category"
              key={uniqid('c-')}
              render={(cat) => (
                <Tag key={uniqid('cat-')} color="blue">
                  {cat}
                </Tag>
              )}
            />
          </ColumnGroup>
          <Column
            title="Description"
            dataIndex="description"
            key={uniqid('desc-')}
          />
          <Column
            width="35%"
            title="Add comment"
            key={uniqid('comm-')}
            render={() => (
              <TextArea
                placeholder="textarea with clear icon"
                allowClear
                key={uniqid('comm-body-')}
                onChange={onChange}
              />
            )}
          />
          <Column
            width="5%"
            title="Result"
            key={uniqid('res-')}
            render={() => (
              <Space key={uniqid('space-')} size="middle">
                <span key={uniqid('sp-')}>Completed:</span>
                <Select
                  defaultValue=""
                  key={uniqid('sel-')}
                  style={{ width: 120 }}
                  onChange={handleChange}>
                  <Option key={uniqid('opt1-')} value="not">
                    No
                  </Option>
                  <Option key={uniqid('opt2-')} value="part">
                    Partially
                  </Option>
                  <Option key={uniqid('opt3-')} value="complete">
                    Fully
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
  data: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SelfGrade;
