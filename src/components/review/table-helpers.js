export const EDITORS = {
  DISPLAY_ONLY: 'DISPLAY_ONLY',
  REVIEWER: 'REVIEWER',
  STUDENT: 'STUDENT',
};

export const getRowsFullView = (gradesList, selfGradeList) =>
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

export const formatGradesToRows = (gradesList, selfGradeList) => {
  if (gradesList.length === 0 || !selfGradeList) {
    return [];
  }

  return getRowsFullView(gradesList, selfGradeList);
};
