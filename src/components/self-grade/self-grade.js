/* eslint-disable react/forbid-prop-types */

import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table, PageHeader, Layout } from 'antd';

const SelfGrade = ({ data, columns }) => {
  const { Content } = Layout;
  const history = useHistory();

  const { items, taskTitle, deadline, totalScore } = data;

  return (
    <Layout>
      <PageHeader
        onBack={() => history.goBack()}
        title={`${taskTitle}, deadline: ${deadline}`}
        subTitle={`maximum score: ${totalScore}`}
      />
      <Content style={{ margin: '0 50px' }}>
        <Table rowKey="uid" dataSource={items} columns={columns} />
      </Content>
    </Layout>
  );
};

SelfGrade.propTypes = {
  data: PropTypes.PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SelfGrade;
