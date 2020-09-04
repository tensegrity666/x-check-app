import React, { useState } from 'react';

const TaskHeader = () => {
  const [searchValue] = useState('sdfgsg');

  return (
    <>
      <h1>Title of new task</h1>
      <form>
        <input type="text" value={searchValue} />
        <button type="button">clear</button>
        <button type="button">search</button>
      </form>
    </>
  );
};

export default TaskHeader;
