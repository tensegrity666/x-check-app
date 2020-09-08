import React, { useState } from 'react';
import { Input, Row, Col } from 'antd';
import { bindActionCreators } from 'redux';
import { useSelector } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';

import store from '../../redux/store';
import * as actions from '../../redux/actions';
import SortGroup from './sort-group';

const Searcher = () => {
  const [searchValue, setSearchValue] = useState(null);

  const taskCategories = useSelector(
    ({ taskReducer }) => taskReducer.categories
  );

  const { dispatch } = store;
  const { changeFilter } = bindActionCreators(actions, dispatch);

  const onSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <Row justify="space-between">
      <Col className="gutter-row" span={18}>
        <Input
          onChange={onSearchChange}
          value={searchValue}
          size="large"
          prefix={<SearchOutlined />}
        />
      </Col>
      <Col span={6}>
        <Row justify="end">
          <SortGroup
            changeFilter={changeFilter}
            taskCategories={taskCategories}
          />
        </Row>
      </Col>
    </Row>
  );
};

export default Searcher;
