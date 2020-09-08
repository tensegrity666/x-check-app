import React, { useState } from 'react';
import { Input, Row, Col } from 'antd';

import SortGroup from './sort-group';

const Searcher = () => {
  const { Search } = Input;

  const [searchValue, setSearchValue] = useState(null);

  const onSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <Row justify="space-between">
      <Col className="gutter-row" span={18}>
        <Search
          placeholder="Search..."
          onChange={onSearchChange}
          // onSearch={onSearchChange}
          value={searchValue}
          size="large"
          enterButton
        />
      </Col>
      <Col span={6}>
        <SortGroup />
      </Col>
    </Row>
  );
};

export default Searcher;
