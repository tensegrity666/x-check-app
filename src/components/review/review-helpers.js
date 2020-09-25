const getInitialGrade = (selfGradeList) =>
  selfGradeList.map((item) => ({
    ...item,
    protest: '',
    suggestedScore: 0,
  }));

const getScoreLimitsAverage = (minScore, maxScore) =>
  Math.ceil((minScore + maxScore) / 2);

export { getInitialGrade, getScoreLimitsAverage };
