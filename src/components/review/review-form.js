import React from 'react';
import { Table } from 'antd';

import { REVIEW_REQUEST } from '../../types';
import populateRowsWithKeys from './table-helpers';

const ReviewForm = ({ reviewRequest }) => {
  const { Column } = Table;

  return (
    <Table
      dataSource={populateRowsWithKeys(reviewRequest.selfGrade)}
      pagination={false}>
      <Column title="Comment" dataIndex="comment" />
      <Column title="Score" dataIndex="score" />
    </Table>
  );
};

ReviewForm.propTypes = {
  reviewRequest: REVIEW_REQUEST.isRequired,
};

export default ReviewForm;
