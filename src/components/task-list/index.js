import React, { useState } from 'react';

const TaskList = () => {
  const [listItems] = useState([1, 2, 3]);

  return <div>{listItems}</div>;
};

export default TaskList;
