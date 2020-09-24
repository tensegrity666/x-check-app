import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

import { REVIEW, REVIEW_REQUEST } from '../../types';
import { EDITORS, formatGradesToRows } from './table-helpers';
import getInitialGrade from './review-helpers';
import ConditionalTextarea from './conditional-textarea';

const ReviewForm = ({ reviewRequest, review, userId }) => {
  const [grade, setGrade] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [authorshipStatus, setAuthorship] = useState(null);
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
    if (review.author === userId) {
      setAuthorship(EDITORS.REVIEWER);
    } else if (reviewRequest.author === userId) {
      setAuthorship(EDITORS.STUDENT);
    }
  }, [userId, review, reviewRequest]);

  useEffect(() => {
    if (reviewRequest.selfGrade && grade.length > 0) {
      const { selfGrade } = reviewRequest;
      const rows = formatGradesToRows(grade, selfGrade);
      setTableRows(rows);
    }
  }, [grade, reviewRequest]);

  return (
    <Table dataSource={tableRows} pagination={false}>
      <Column
        title="Comment"
        dataIndex="inputField"
        render={(text, record) =>
          ConditionalTextarea({
            text,
            record,
            userStatus: authorshipStatus,
          })
        }
      />
      <Column title="Score" dataIndex="scoreField" />
    </Table>
  );
};

ReviewForm.propTypes = {
  reviewRequest: REVIEW_REQUEST.isRequired,
  userId: PropTypes.string.isRequired,
  review: REVIEW,
};

ReviewForm.defaultProps = {
  review: {},
};

export default ReviewForm;
