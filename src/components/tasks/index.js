import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const index = () => {
  return (
    <main>
      <Typography>
        <Title>Tasks</Title>
      </Typography>
      <section>Tasks will be listed here</section>
    </main>
  );
};

export default index;
