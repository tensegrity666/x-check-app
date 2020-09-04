import React, { useState } from 'react';

const AddNewItem = () => {
  const [inputValue] = useState(null);

  return (
    <form>
      <input type="text" value={inputValue} />
      <button type="submit">add</button>
    </form>
  );
};

export default AddNewItem;
