import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';
import PropTypes from 'prop-types';

import { REVIEW, REVIEW_REQUEST, TASK } from '../../types';
import { EDITORS, REVIEW_STATE } from './constants';
import { formatGradesToRows, getCriteriaCell } from './table-helpers';
import { getInitialGrade } from './review-helpers';
import ConditionalTextarea from './conditional-textarea';
import ConditionalScoreInput from './conditional-score-input';
import ReviewControls from './review-controls';

import {
  handleAppError,
  createReview,
  editReview,
  toggleReviewStatus,
} from '../../redux/actions';
import store from '../../redux/store';

const ReviewForm = ({ reviewRequest, review, task, userId }) => {
  const [grade, setGrade] = useState([]);
  const [authorshipStatus, setAuthorship] = useState(null);
  const [reviewStatus, setReviewStatus] = useState(REVIEW_STATE.DRAFT);
  const reviewIsLoading = useSelector(
    ({ reviewReducer }) => reviewReducer.isLoading
  );

  const { dispatch } = store;
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

  const handleScoreChange = ({ itemId, authorship }) => (value) => {
    const dynamicKey =
      authorship === EDITORS.REVIEWER ? 'score' : 'suggestedScore';
    setGrade((prevGrade) => {
      return prevGrade.map((item) => {
        if (item.id === itemId) {
          return { ...item, [dynamicKey]: String(value) };
        }
        return item;
      });
    });
  };

  const onDisputeReview = () => {
    setReviewStatus(REVIEW_STATE.DISPUTED);
  };

  const handleReviewCreation = async () => {
    return dispatch(createReview(reviewRequest.id, userId, grade));
  };

  const handleReviewEdit = async () => {
    return dispatch(editReview(userId, review.id, grade));
  };

  const handleToggleReviewStatus = async (
    modifierType,
    updatedReviewId = null
  ) => {
    return dispatch(
      toggleReviewStatus(userId, updatedReviewId || review.id, modifierType)
    );
  };

  const getTableRows = () => {
    try {
      return formatGradesToRows(
        grade,
        reviewRequest.selfGrade,
        task.items,
        reviewStatus
      );
    } catch (error) {
      dispatch(handleAppError(error.message));
      return [];
    }
  };

  useEffect(() => {
    if (review.grade && review.state) {
      const { grade: reviewGrade, state } = review;
      setReviewStatus(state);
      setGrade(reviewGrade);
    }

    if (!review.grade && reviewRequest.selfGrade) {
      const { selfGrade } = reviewRequest;
      const initialGrade = getInitialGrade(selfGrade);
      setGrade(initialGrade);
    }
  }, [reviewRequest, review]);

  useEffect(() => {
    if (review.author === userId || 'temporary-mock') {
      setAuthorship(EDITORS.REVIEWER);
    } else if (reviewRequest.author === userId) {
      setAuthorship(EDITORS.STUDENT);
    }
  }, [userId, review, reviewRequest]);

  return (
    <>
      <ReviewControls
        authorshipStatus={authorshipStatus}
        reviewStatus={reviewStatus}
        onDisputeReview={onDisputeReview}
        createReview={handleReviewCreation}
        editReview={handleReviewEdit}
        toggleReviewStatus={handleToggleReviewStatus}
      />
      <Table
        dataSource={getTableRows()}
        loading={reviewIsLoading}
        pagination={false}
        bordered>
        <Column
          title="Task Criteria"
          dataIndex="criteria"
          width="30%"
          render={(text, record) => getCriteriaCell(text, record, reviewStatus)}
        />
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
        <Column
          title="Score"
          dataIndex="scoreField"
          align="center"
          render={(text, record) =>
            ConditionalScoreInput({
              text,
              record,
              userStatus: authorshipStatus,
              handleChange: handleScoreChange(record),
            })
          }
        />
      </Table>
    </>
  );
};

ReviewForm.propTypes = {
  reviewRequest: REVIEW_REQUEST.isRequired,
  userId: PropTypes.string.isRequired,
  task: TASK.isRequired,
  review: REVIEW,
};

ReviewForm.defaultProps = {
  review: {},
};

export default ReviewForm;
