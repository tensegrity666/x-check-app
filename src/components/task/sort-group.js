import React from 'react';
import { Button } from 'antd';

import styles from './index.module.css';

const SortGroup = () => {
  const { sort } = styles;

  return (
    <Button.Group className={sort}>
      <Button>Basic</Button>
      <Button>Advanced</Button>
      <Button>Hacker</Button>
      <Button>Fines</Button>
    </Button.Group>
  );
};

export default SortGroup;
