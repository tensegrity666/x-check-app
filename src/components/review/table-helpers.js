import { EDITORS, REVIEW_STATE } from './constants';

const getRowsFullView = (gradesList, selfGradeList) =>
  gradesList
    .map(({ id: itemId, score, comment, protest, suggestedScore }) => {
      const currentItem = selfGradeList.find(({ id }) => id === itemId);
      return [
        {
          key: itemId,
          itemId,
          inputField: currentItem.comment,
          scoreField: currentItem.score,
          authorship: EDITORS.DISPLAY_ONLY,
        },
        {
          key: `${itemId}-reviewer`,
          itemId,
          inputField: comment,
          scoreField: score,
          authorship: EDITORS.REVIEWER,
        },
        {
          key: `${itemId}-student`,
          itemId,
          inputField: protest,
          scoreField: suggestedScore,
          authorship: EDITORS.STUDENT,
        },
      ];
    })
    .flat();

const getRowsShortView = (gradesList, selfGradeList) =>
  gradesList
    .map(({ id: itemId, score, comment }) => {
      const currentItem = selfGradeList.find(({ id }) => id === itemId);
      return [
        {
          key: itemId,
          itemId,
          inputField: currentItem.comment,
          scoreField: currentItem.score,
          authorship: EDITORS.DISPLAY_ONLY,
        },
        {
          key: `${itemId}-reviewer`,
          itemId,
          inputField: comment,
          scoreField: score,
          authorship: EDITORS.REVIEWER,
        },
      ];
    })
    .flat();

const formatGradesToRows = (gradesList, selfGradeList, reviewState) => {
  if (gradesList.length === 0 || !selfGradeList) {
    return [];
  }

  if (
    reviewState === REVIEW_STATE.DRAFT ||
    reviewState === REVIEW_STATE.PUBLISHED
  ) {
    return getRowsShortView(gradesList, selfGradeList);
  }

  return getRowsFullView(gradesList, selfGradeList);
};

export default formatGradesToRows;
