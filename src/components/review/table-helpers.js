import { EDITORS, REVIEW_STATE, ROWS } from './constants';
import CriteriaCell from './criteria-cell';
import { getScoreLimitsAverage } from './review-helpers';

const getRowsFullView = (gradesList, selfGradeList, taskItems) =>
  gradesList
    .map(({ id: itemId, score, comment, protest, suggestedScore }) => {
      const currentItem = selfGradeList.find(({ id }) => id === itemId);
      const taskItem = taskItems.find(({ id }) => id === itemId);
      const { title, description, minScore, maxScore, average } = taskItem;
      return [
        {
          key: itemId,
          itemId,
          criteria: { title, description },
          inputField: currentItem.comment,
          scoreField: currentItem.score,
          authorship: EDITORS.DISPLAY_ONLY,
        },
        {
          key: `${itemId}-reviewer`,
          itemId,
          inputField: comment,
          minScore,
          maxScore,
          average,
          scoreField: score,
          authorship: EDITORS.REVIEWER,
        },
        {
          key: `${itemId}-student`,
          itemId,
          minScore,
          maxScore,
          average,
          inputField: protest,
          scoreField: suggestedScore,
          authorship: EDITORS.STUDENT,
        },
      ];
    })
    .flat();

const getRowsShortView = (gradesList, selfGradeList, taskItems) =>
  gradesList
    .map(({ id: itemId, score, comment }) => {
      const currentItem = selfGradeList.find(({ id }) => id === itemId);
      const taskItem = taskItems.find(({ id }) => id === itemId);
      const { title, description, minScore, maxScore, average } = taskItem;
      return [
        {
          key: itemId,
          itemId,
          criteria: { title, description },
          inputField: currentItem.comment,
          scoreField: currentItem.score,
          authorship: EDITORS.DISPLAY_ONLY,
        },
        {
          key: `${itemId}-reviewer`,
          itemId,
          minScore,
          maxScore,
          average,
          inputField: comment,
          scoreField: score,
          authorship: EDITORS.REVIEWER,
        },
      ];
    })
    .flat();

const formatGradesToRows = (
  gradesList,
  selfGradeList,
  taskItems,
  reviewState
) => {
  if (gradesList.length === 0 || !selfGradeList) {
    return [];
  }
  const taskItemsWithAverage = taskItems.map((item) => ({
    ...item,
    average: getScoreLimitsAverage(item.minScore, item.maxScore),
  }));
  if (
    reviewState === REVIEW_STATE.DRAFT ||
    reviewState === REVIEW_STATE.PUBLISHED
  ) {
    return getRowsShortView(gradesList, selfGradeList, taskItemsWithAverage);
  }

  return getRowsFullView(gradesList, selfGradeList, taskItemsWithAverage);
};

const getCriteriaRowSpan = (reviewState) => {
  if (
    reviewState === REVIEW_STATE.DRAFT ||
    reviewState === REVIEW_STATE.PUBLISHED
  ) {
    return ROWS.SHORT_VIEW_NUMBER;
  }
  return ROWS.FULL_VIEW_NUMBER;
};

const getCriteriaCell = (value, row, reviewState) => {
  if (row.authorship === EDITORS.DISPLAY_ONLY) {
    return {
      children: CriteriaCell({
        title: value.title,
        description: value.description,
      }),
      props: {
        rowSpan: getCriteriaRowSpan(reviewState),
      },
    };
  }
  return {
    children: value,
    props: {
      rowSpan: 0,
    },
  };
};

export { formatGradesToRows, getCriteriaCell };
