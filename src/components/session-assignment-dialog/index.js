import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

import { tableColumns, populateWithKeys } from './table-helpers';
import getAssignments from './assignment-helper';
import reviewRequestsList from './mock-review-requests.json';

const SessionAssignmentDialog = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const result = getAssignments(reviewRequestsList, 4);
    setAssignments(result);
  }, []);

  return (
    <section>
      <Table
        columns={tableColumns}
        dataSource={populateWithKeys(assignments)}
      />
    </section>
  );
};

export default SessionAssignmentDialog;
