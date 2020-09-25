import { EDITORS, REVIEW_STATE } from './constants';
import { getScoreLimitsAverage } from './review-helpers';

const getRowsFullView = (gradesList, selfGradeList, taskItems) =>
  gradesList
    .map(({ id: itemId, score, comment, protest, suggestedScore }) => {
      const currentItem = selfGradeList.find(({ id }) => id === itemId);
      const taskItem = taskItems.find(({ id }) => id === itemId);
      const { title, minScore, maxScore, average } = taskItem;
      return [
        {
          key: itemId,
          itemId,
          title,
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
      const { title, minScore, maxScore, average } = taskItem;
      return [
        {
          key: itemId,
          itemId,
          title,
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

export default formatGradesToRows;
