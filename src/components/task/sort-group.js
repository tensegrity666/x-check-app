/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const SortGroup = ({ changeFilter, taskCategories }) => {
  const { basic, advanced, hacker, fines } = taskCategories;

  return (
    <Button.Group>
      <Button onClick={() => changeFilter('all')}>All</Button>
      <Button onClick={() => changeFilter(basic.title)}>Basic</Button>
      <Button onClick={() => changeFilter(advanced.title)}>Advanced</Button>
      <Button onClick={() => changeFilter(hacker.title)}>Hacker</Button>
      <Button onClick={() => changeFilter(fines.title)}>Fines</Button>
    </Button.Group>
  );
};

SortGroup.propTypes = {
  changeFilter: PropTypes.func.isRequired,
  taskCategories: PropTypes.object.isRequired,
};

export default SortGroup;
