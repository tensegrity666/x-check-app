import React, { useState } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

import { tableColumns, pagination } from './constants';
import { getColumnsWithSearch, reduceRequestsScore } from './utils';
import styles from './index.module.css';

const RequestsTable = ({ reviewRequests }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const { reviewRequestsSection } = styles;

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
    tableColumns,
    handleSearch,
    handleReset,
    searchText,
    searchedColumn
  );

  return (
    <section className={reviewRequestsSection}>
      <h1>Review Requests</h1>
      <Table
        dataSource={reduceRequestsScore(reviewRequests)}
        columns={columnsWithSearch}
        pagination={pagination}
        scroll={{ x: 1200, y: 'calc(100vh - 210px)' }}
      />
    </section>
  );
};

RequestsTable.propTypes = {
  reviewRequests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      crossCheckSessionId: PropTypes.string,
      author: PropTypes.string,
      task: PropTypes.string,
      state: PropTypes.string,
      selfGrade: PropTypes.object,
    })
  ),
};

RequestsTable.defaultProps = {
  reviewRequests: [],
};

export default RequestsTable;
