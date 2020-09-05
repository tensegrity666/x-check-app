import React from 'react';
import { Input, Row, Col } from 'antd';

import SortGroup from './sort-group';

const Searcher = () => {
  const { Search } = Input;

  return (
    <Row gutter={16}>
      <Col className="gutter-row" span={16}>
        <Search
          placeholder="input search text"
          // eslint-disable-next-line no-console
          onSearch={(value) => console.log(value)}
          size="large"
          enterButton
        />
      </Col>
      <Col className="gutter-row" span={8}>
        <SortGroup />
      </Col>
    </Row>
  );
};

export default Searcher;
