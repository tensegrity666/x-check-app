import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

import { REVIEW, REVIEW_REQUEST } from '../../types';
import formatGradesToRows from './table-helpers';
import getInitialGrade from './review-helpers';

const ReviewForm = ({ reviewRequest, review }) => {
  const [grade, setGrade] = useState([]);
  const [tableRows, setTableRows] = useState([]);
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
    if (reviewRequest.selfGrade && grade.length > 0) {
      const { selfGrade } = reviewRequest;
      const rows = formatGradesToRows(grade, selfGrade);
      setTableRows(rows);
    }
  }, [grade, reviewRequest]);

  return (
    <Table dataSource={tableRows} pagination={false}>
      <Column title="Comment" dataIndex="inputField" />
      <Column title="Score" dataIndex="scoreField" />
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
