import React, { useState } from 'react';

import { Input, Button } from 'antd';

const { TextArea } = Input;

const AddNewItem = () => {
  const [inputValue] = useState(null);

  return (
    <>
      <TextArea rows={4} value={inputValue} />
      <Button type="primary" block>
        add item to task
      </Button>
    </>
  );
};

export default AddNewItem;
