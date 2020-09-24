import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

import { REVIEW, REVIEW_REQUEST } from '../../types';
import populateRowsWithKeys from './table-helpers';
import getInitialGrade from './review-helpers';

const ReviewForm = ({ reviewRequest, review }) => {
  const [grade, setGrade] = useState({});
  const { Column } = Table;

  useEffect(() => {
    if (!review.grade && reviewRequest.selfGrade) {
      const { selfGrade } = reviewRequest;
      const initialGrade = getInitialGrade(selfGrade);
      setGrade(initialGrade);
    } else {
      const { grade: reviewGrade } = review;
      setGrade(reviewGrade);
    }
  }, [reviewRequest, review]);

  useEffect(() => {
    console.dir(grade);
  }, [grade]);

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
  review: REVIEW,
};

ReviewForm.defaultProps = {
  review: {},
};

export default ReviewForm;
