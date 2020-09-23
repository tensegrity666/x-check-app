import React, { useState } from 'react';
import { Table, Typography } from 'antd';
import PropTypes from 'prop-types';

import { tableColumns, pagination, getActionColumn } from './constants';
import { getColumnsWithSearch, getFormattedRows } from './utils';
import styles from './index.module.css';
import { REVIEW_REQUEST } from '../../types';

const RequestsTable = ({ reviewRequests, userId, title }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const { reviewRequestsSection } = styles;

  const { Title } = Typography;

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const columnsWithSearch = getColumnsWithSearch(
    [...tableColumns, getActionColumn(userId)],
    handleSearch,
    handleReset,
    searchText,
    searchedColumn
  );

  return (
    <section className={reviewRequestsSection}>
      {title && <Title level={3}>{title}</Title>}
      <Table
        dataSource={getFormattedRows(reviewRequests)}
        columns={columnsWithSearch}
        pagination={pagination}
        scroll={{ x: 1200, y: 'calc(100vh - 210px)' }}
      />
    </section>
  );
};

RequestsTable.propTypes = {
  userId: PropTypes.string.isRequired,
  title: PropTypes.string,
  reviewRequests: PropTypes.arrayOf(REVIEW_REQUEST),
};

RequestsTable.defaultProps = {
  reviewRequests: [],
  title: null,
};

export default RequestsTable;
