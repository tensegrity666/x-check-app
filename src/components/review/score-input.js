import React from 'react';
import PropTypes from 'prop-types';
import { InputNumber, Radio, Space } from 'antd';
import { SCORE_SELECT_DEFAULT_STEP } from './constants';

const ScoreInput = ({ text, handleChange, minScore, maxScore, average }) => {
  const handleRadioChange = (event) => {
    const {
      target: { value },
    } = event;
    handleChange(value);
  };
  return (
    <Space direction="vertical">
      <InputNumber
        value={text}
        onChange={handleChange}
        min={minScore}
        max={maxScore}
        step={SCORE_SELECT_DEFAULT_STEP}
      />
      <Radio.Group
        defaultValue={text}
        onChange={handleRadioChange}
        size="small">
        <Radio.Button value={minScore}>None</Radio.Button>
        <Radio.Button value={average}>Partial</Radio.Button>
        <Radio.Button value={maxScore}>Complete</Radio.Button>
      </Radio.Group>
    </Space>
  );
};

ScoreInput.propTypes = {
  text: PropTypes.node.isRequired,
  handleChange: PropTypes.func.isRequired,
  minScore: PropTypes.number.isRequired,
  maxScore: PropTypes.number.isRequired,
  average: PropTypes.number.isRequired,
};

export default ScoreInput;
