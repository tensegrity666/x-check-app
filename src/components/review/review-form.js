import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

import { REVIEW, REVIEW_REQUEST } from '../../types';
import { EDITORS, formatGradesToRows } from './table-helpers';
import getInitialGrade from './review-helpers';
import ConditionalTextarea from './conditional-textarea';

const ReviewForm = ({ reviewRequest, review, userId }) => {
  const [grade, setGrade] = useState([]);
  const [authorshipStatus, setAuthorship] = useState(null);
  const { Column } = Table;

  const handleTextChange = ({ itemId, authorship }) => (event) => {
    const dynamicKey = authorship === EDITORS.REVIEWER ? 'comment' : 'protest';
    const {
      target: { value },
    } = event;
    setGrade((prevGrade) => {
      return prevGrade.map((item) => {
        if (item.id === itemId) {
          return { ...item, [dynamicKey]: value };
        }
        return item;
      });
    });
  };

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

  return (
    <Table
      dataSource={formatGradesToRows(grade, reviewRequest.selfGrade)}
      pagination={false}>
      <Column
        title="Comment"
        dataIndex="inputField"
        render={(text, record) =>
          ConditionalTextarea({
            text,
            record,
            userStatus: authorshipStatus,
            handleChange: handleTextChange(record),
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
