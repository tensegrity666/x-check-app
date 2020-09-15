import React, { useState } from 'react';
import { Table } from 'antd';
import { tableColumns, pagination } from './constants';
import defaultCustomers from './mockData';
import getColumnsWithSearch from './utils';
import styles from './index.module.css';

const RequestsTable = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const { reviewRequests } = styles;

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
    <div className={reviewRequests}>
      <h1>Review Requests</h1>
      <Table
        dataSource={defaultCustomers}
        columns={columnsWithSearch}
        pagination={pagination}
        scroll={{ x: 1200, y: 'calc(100vh - 210px)' }}
      />
    </div>
  );
};

export default RequestsTable;
