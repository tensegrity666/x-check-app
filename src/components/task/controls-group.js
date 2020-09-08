/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Select, Button, Slider, InputNumber, Col, Row } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

function handleChange(value) {
  // eslint-disable-next-line no-console
  console.log(`selected ${value}`);
}

const ControlsGroup = ({ range, score, category, taskCategories }) => {
  const { Option } = Select;
  const { basic, advanced, hacker, fines } = taskCategories;
  const [inputValue, setInputValue] = useState(score);

  const onChange = (value) => {
    setInputValue(value);
  };

  return (
    <Col span={5}>
      <Row justify="center" gutter={[0, 10]}>
        <Slider
          min={range[0]}
          max={range[1]}
          onChange={onChange}
          style={{ width: 140 }}
          value={inputValue}
        />
        <InputNumber
          min={range[0]}
          max={range[1]}
          style={{ margin: '0 10px', width: 50 }}
          value={inputValue}
          onChange={onChange}
        />
      </Row>
      <Row justify="center" gutter={[10, 10]}>
        <Select
          defaultValue={category}
          style={{ width: 160 }}
          onChange={handleChange}>
          <Option value={basic.title}>{basic.title}</Option>
          <Option value={advanced.title}>{advanced.title}</Option>
          <Option value={hacker.title}>{hacker.title}</Option>
          <Option value={fines.title}>
            <span style={{ color: 'red' }}>{fines.title}</span>
          </Option>
        </Select>
        <Button type="primary" icon={<EditOutlined />} />
        <Button type="primary" danger icon={<DeleteOutlined />} />
      </Row>
    </Col>
  );
};

ControlsGroup.propTypes = {
  taskCategories: PropTypes.object.isRequired,
  range: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default ControlsGroup;
