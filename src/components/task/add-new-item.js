/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Row, Col, InputNumber, Slider, Select } from 'antd';

const AddNewItem = ({
  onCategoryChange,
  taskCategories,
  onScoreRangeChange,
  onItemSubmit,
  onTextChange,
  rangeValue,
  inputValue,
}) => {
  const { Option } = Select;
  const { TextArea } = Input;
  const { basic, advanced, hacker, fines } = taskCategories;

  return (
    <Row gutter={[10, 10]}>
      <Col span={16}>
        <TextArea rows={8} onChange={onTextChange} value={inputValue} />
        <Button onClick={onItemSubmit} type="primary" block>
          add item to task
        </Button>
      </Col>
      <Col span={8}>
        <Row justify="center" gutter={[0, 10]}>
          <Slider
            min={-20}
            max={50}
            onChange={onScoreRangeChange}
            style={{ width: 140 }}
            value={rangeValue}
          />
          <InputNumber
            min={-20}
            max={50}
            style={{ margin: '0 10px', width: 50 }}
            value={rangeValue}
            onChange={onScoreRangeChange}
          />
        </Row>
        <Row justify="center" gutter={[10, 10]}>
          <Select
            defaultValue={basic.title}
            style={{ width: 160 }}
            onChange={onCategoryChange}>
            <Option value={basic.title}>{basic.title}</Option>
            <Option value={advanced.title}>{advanced.title}</Option>
            <Option value={hacker.title}>{hacker.title}</Option>
            <Option value={fines.title}>
              <span style={{ color: 'red' }}>{fines.title}</span>
            </Option>
          </Select>
        </Row>
      </Col>
    </Row>
  );
};

AddNewItem.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
  onScoreRangeChange: PropTypes.func.isRequired,
  onItemSubmit: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  taskCategories: PropTypes.object.isRequired,
  rangeValue: PropTypes.number.isRequired,
  inputValue: PropTypes.string,
};

AddNewItem.defaultProps = {
  inputValue: '',
};

export default AddNewItem;
