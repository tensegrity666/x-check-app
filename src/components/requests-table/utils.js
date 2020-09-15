import React from 'react';
import { Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const getColumnSearchProps = (
  dataIndex,
  handleSearch,
  handleReset,
  searchedColumn,
  searchText
) => {
  let searchInput = null;
  return {
    filterDropdown: (filterProps) => {
      const {
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      } = filterProps;
      return (
        <div style={{ padding: 8 }}>
          <Input
            ref={(node) => {
              searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}>
              Search
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      );
    },
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered && '#1890ff' }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  };
};

const getColumnsWithSearch = (
  tableColumns,
  handleSearch,
  handleReset,
  searchText,
  searchedColumn
) => {
  return tableColumns.map((el) => {
    const searchOptions = el.isSearchable
      ? {
          ...getColumnSearchProps(
            el.dataIndex,
            handleSearch,
            handleReset,
            searchText,
            searchedColumn
          ),
        }
      : null;
    return {
      ...el,
      ...searchOptions,
    };
  });
};

export default getColumnsWithSearch;
