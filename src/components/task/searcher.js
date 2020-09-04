import React from 'react';

import { Input } from 'antd';

const { Search } = Input;

const Searcher = () => {
  return (
    <Search
      placeholder="input search text"
      // eslint-disable-next-line no-console
      onSearch={(value) => console.log(value)}
      size="large"
      enterButton
    />
  );
};

export default Searcher;
