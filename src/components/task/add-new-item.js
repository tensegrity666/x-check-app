/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Row, Col, InputNumber, Slider, Select } from 'antd';

import styles from './index.module.css';

const AddNewItem = ({
  onCategoryChange,
  taskCategories,
  onScoreRangeChange,
  onItemSubmit,
  onTextChange,
  rangeValue,
  inputValue,
}) => {
  const MIN_VALUE = -50;
  const MAX_VALUE = 100;

  const { Option } = Select;
  const { TextArea } = Input;
  const {
    addItemWrapper,
    controlsWrapper,
    textArea,
    finesColor,
    advancedColor,
    hackerColor,
    slider,
    sliderRange,
    select,
    selectWrapper,
  } = styles;
  const { basic, advanced, hacker, fines } = taskCategories;

  return (
    <Row className={addItemWrapper}>
      <Col span={18}>
        <TextArea
          placeholder="Write text of task item"
          className={textArea}
          rows={7}
          onChange={onTextChange}
          value={inputValue}
        />
      </Col>
      <Col span={6} className={controlsWrapper}>
        <Row justify="space-between" className={slider}>
          <Slider
            min={MIN_VALUE}
            max={MAX_VALUE}
            step={5}
            onChange={onScoreRangeChange}
            className={sliderRange}
            value={rangeValue}
          />
          <InputNumber
            min={MIN_VALUE}
            max={MAX_VALUE}
            value={rangeValue}
            onChange={onScoreRangeChange}
          />
        </Row>
        <Row className={selectWrapper}>
          <Select
            placeholder="Choose category"
            className={select}
            onChange={onCategoryChange}>
            <Option value={basic.title}>{basic.title}</Option>
            <Option value={advanced.title}>
              <span className={advancedColor}>{advanced.title}</span>
            </Option>
            <Option value={hacker.title}>
              <span className={hackerColor}>{hacker.title}</span>
            </Option>
            <Option value={fines.title}>
              <span className={finesColor}>{fines.title}</span>
            </Option>
          </Select>
        </Row>
        <Row>
          <Button onClick={onItemSubmit} type="primary" block>
            Add item
          </Button>
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
