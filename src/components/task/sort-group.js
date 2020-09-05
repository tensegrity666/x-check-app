import React from 'react';
import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const SortGroup = () => {
  return (
    <Button.Group>
      <Button type="default" icon={<EditOutlined />}>
        basic scope
      </Button>
      <Button danger icon={<EditOutlined />}>
        extra scope
      </Button>
      <Button danger icon={<DeleteOutlined />}>
        hacker scope
      </Button>
    </Button.Group>
  );
};

export default SortGroup;
