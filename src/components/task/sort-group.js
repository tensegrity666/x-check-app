import React from 'react';
import { Button } from 'antd';

const SortGroup = () => {
  return (
    <Button.Group>
      <Button>All</Button>
      <Button>Basic</Button>
      <Button>Advanced</Button>
      <Button>Hacker</Button>
      <Button>Fines</Button>
    </Button.Group>
  );
};

export default SortGroup;
